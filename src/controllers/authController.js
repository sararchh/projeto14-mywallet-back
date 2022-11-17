import bcrypt from 'bcrypt';
import mongoConection from '../database/mongo.js';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

let dbMongo = await mongoConection();

export default {
    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const schema = Yup.object().shape({
                name: Yup.string().required('Name é obrigatório'),
                email: Yup.string().email('Deve ser e-mail válido').required('E-mail é obrigatório'),
                password: Yup.string().required('Senha é obrigatório')
              });
              
              let errorsSchema;
              await schema.validate(req.body, { abortEarly: false }).catch((errors) => {
                errorsSchema = errors;
              });
        
              if (errorsSchema) {
                return res.status(422).send({ message: errorsSchema });
              }

            const userExists = await dbMongo.collection('users').findOne({ email });

            if (userExists) {
                return res.status(400).send({ message: "Já existe usuário com esse e-mail." });
            }

            const passwordHash = bcrypt.hashSync(password, 10);

            await dbMongo.collection('users').insertOne({ name, email, password: passwordHash })

            return res.status(201).send({ message: "Usuário cadastrado com sucesso!" });

        } catch (error) {
            console.log("error", error);
            return res.status(400).send({ message: "Falha ao cadastrar, verifique e tente novamente." });

        }

    },

    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            const schema = Yup.object().shape({
                email: Yup.string().email('Deve ser e-mail válido').required('E-mail é obrigatório'),
                password: Yup.string().required('Senha é obrigatório')
              });
              
              let errorsSchema;
              await schema.validate(req.body, { abortEarly: false }).catch((errors) => {
                errorsSchema = errors;
              });
        
              if (errorsSchema) {
                return res.status(422).send({ message: errorsSchema });
              }

            const userExists = await dbMongo.collection('users').findOne({ email });

            if (!userExists) {
                return res.status(401).send({ message: "E-mail não encontrado, verifique e tente novamente." });
            }

            let validPass = bcrypt.compareSync(password, userExists.password);

            if (!validPass) {
                return res.status(401).send({ message: "Senha inválida, verifique e tente novamente." });
            }

            await dbMongo.collection('sessions').deleteOne({ userId: userExists._id });

            const token = uuid();
            await dbMongo.collection('sessions').insertOne({
                userId: userExists._id,
                token,
                dateLogin: Date.now(),
            })

            delete userExists.password;
            return res.status(200).send({ message: "Login realizado com sucesso!", user: userExists, token: token });

        } catch (error) {
            return res.status(400).send({ message: "Falha ao cadastrar, verifique e tente novamente." });

        }

    },
}