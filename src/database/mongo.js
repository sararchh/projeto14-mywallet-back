import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function conection () {
    let db;
    try {
        db = await mongoClient.db(process.env.DB_NAME);
        console.log("Mongo connection succefully");
        return db;
    } catch (error) {
        console.error(error)
        console.log("Mongo connection error");
        return error;    
    }
}