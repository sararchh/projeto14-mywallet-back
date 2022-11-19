import mongoConection from '../database/mongo.js';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

let dbMongo = await mongoConection();

export default {
    store: async (req, res) => {
        try {
            const { type } = req.query;
            const { userId, value, description } = req.body;

            const { session } = res.locals;

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
            const { session } = res.locals;

            const transactions = await dbMongo.collection('transaction').find({ userId: session?.userId }).toArray();

            return res.status(200).send(transactions);
        } catch (error) {
            return res.send(404);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;

            await dbMongo.collection('transaction').deleteOne({ "_id": ObjectId(id) });

            res.status(200).send({message: 'Deletado com sucesso.'});
        } catch (error) {
            res.sendStatus(404);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const obj = req.body;

            await dbMongo.collection('transaction').updateOne({ "_id": ObjectId(id) }, { $set: obj });

            res.status(200).send({message: 'Atualizado com sucesso.'});
        } catch (error) {
            res.sendStatus(404);
        }
    }
}