import * as Yup from "yup";

const transactionSchema = Yup.object().shape({
  userId: Yup.string().required('ID é obrigatório'),
  value: Yup.number().required('Senha é obrigatório'),
  description: Yup.string().required('Descrição é obrigatório'),
});


export default transactionSchema;