import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import * as yup from 'yup';

const formSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório').matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Não é permitido Números'),
  telefone: yup.number().required().integer('Somente Numeros'),
  email: yup.string().email('Digite um email válido').required(),
  data: yup.date().max(new Date(), 'Não é possível incluir uma data futura'),
});

interface ICadastroProps {
  children: React.ReactNode;
}
export const Cadastro: React.FC<ICadastroProps> = ({ children }) => {


  const [isLoading, setIsLoading] = useState(false);

  const [nomeError, setNomeError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [dataError, setDataError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');


  const handleSubmit = () => {
    setIsLoading(true);

    formSchema
      .validate({ nome, telefone, email, data }, { abortEarly: false })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach(error => {
          if (error.path === 'nome') {
            setNomeError(error.message);
          } else if (error.path === 'telefone') {
            setTelefoneError(error.message);
          }else if (error.path === 'email') {
            setEmailError(error.message);
          }else if (error.path === 'data') {
            setDataError(error.message);
          }
        });
      });
  };


  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>Formulário de Cadastro</Typography>

            <TextField
              fullWidth
              type='text'
              label='Nome'
              value={nome}
              disabled={isLoading}
              
              error={!!nomeError}
              helperText={nomeError}
              onKeyDown={() => setNomeError('')}
              onChange={e => setNome(e.target.value)}
            />
            <TextField
              fullWidth
              type='tel'
              label='Telefone'
              value={telefone}
              disabled={isLoading}
              error={!!telefoneError}
              helperText={telefoneError}
              onKeyDown={() => setTelefoneError('')}
              onChange={e => setTelefone(e.target.value)}
            />


            <TextField
              fullWidth
              type='email'
              label='Email'
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              type='date'
              value={data}
              disabled={isLoading}
              error={!!dataError}
              helperText={dataError}
              onKeyDown={() => setDataError('')}
              onChange={e => setData(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>

            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
            >
              Entrar
            </Button>

          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
