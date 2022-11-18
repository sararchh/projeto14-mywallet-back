import express from 'express';
import cors from 'cors';

import mongoConection from './database/mongo.js';

import routes from "./routes/index.js"

await mongoConection();

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);


export default app;