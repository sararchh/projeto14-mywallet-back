import * as Yup from "yup";

const userSignInSchema = Yup.object().shape({
  email: Yup.string().email('Deve ser e-mail válido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório')
});


export default userSignInSchema;