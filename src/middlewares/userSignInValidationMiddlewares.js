import userSignInSchema from "../schemas/userSignInSchema.js";

export const validationUserSignIn = async (req, res, next) => {
  let errorsSchema;
  await userSignInSchema.validate(req.body, { abortEarly: false }).catch((errors) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.status(422).send({ message: errorsSchema });
  }

  next();
}