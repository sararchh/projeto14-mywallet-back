import transactionSchema from "../schemas/transactionSchema.js";

export const validationTransaction = async (req, res, next) => {
  let errorsSchema;
  await transactionSchema.validate(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}

export default validationTransaction;