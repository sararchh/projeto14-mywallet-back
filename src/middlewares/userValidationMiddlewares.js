import userSchema from "../schemas/userSchema.js";

export const validationUser = async (req, res, next) => {
  let errorsSchema;
  await userSchema.validate(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}

export default validationUser;