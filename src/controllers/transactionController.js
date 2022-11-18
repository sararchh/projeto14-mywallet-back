import mongoConection from '../database/mongo.js';
import dayjs from 'dayjs';

let dbMongo = await mongoConection();

export default {
    store: async (req, res) => {
        try {
            const { type } = req.query;
            const { userId, value, description } = req.body;

            const { authorization } = req.headers;

            const token = authorization?.replace('Bearer ', '');
            if (!token) {
                return res.sendStatus(401);
            }

            const session = await dbMongo.collection('sessions').findOne({ token });
            if (!session) {
                return res.sendStatus(401);
            }

            const transaction = await dbMongo.collection('transaction').insertOne({
                userId: session.userId,
                type: type,
                value: value,
                description: description,
                day: dayjs().format('DD/MM')
            });

            res.status(200).send(transaction);

        } catch (error) {
            return res.status(400).send({ message: "Falha ao cadastrar transaçao, verifique e tente novamente." });

        }

    },

    findTransactions: async (req, res) => {
        try {
            const { authorization } = req.headers;
            const token = authorization?.replace('Bearer ' + '');
            if (!token) {
                return res.sendStatus(401);
            }
            const session = await dbMongo.collection('sessions').findOne({ token });
            if (!session) {
                return res.sendStatus(401);
            }

            const transactions = await dbMongo.collection('transaction').find({ userId: session?.userId }).toArray();

            return res.status(200).send(transactions);
        } catch (error) {
            return res.send(404);
        }
    },
}