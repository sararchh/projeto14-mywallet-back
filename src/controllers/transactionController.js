import mongoConection from '../database/mongo.js';

let dbMongo = await mongoConection();

export default {
    store: async (req, res) => {
        try {
            const { type } = req.query;
            const { userId, value, description } = req.body;

            console.log(type);

            res.sendStatus(200);

        } catch (error) {
            return res.status(400).send({ message: "Falha ao cadastrar transaçao, verifique e tente novamente." });

        }

    },

}