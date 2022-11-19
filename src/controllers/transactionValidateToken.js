import mongoConection from '../database/mongo.js';
let dbMongo = await mongoConection();

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(401);
  }
  const session = await dbMongo.collection('sessions').findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }

  res.locals.session = session;
  next();
}