import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  name: Yup.string().required('Name é obrigatório'),
  email: Yup.string().email('Deve ser e-mail válido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatório')
});


export default userSchema;