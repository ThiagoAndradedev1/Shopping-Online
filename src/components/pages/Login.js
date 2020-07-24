import React, { useState, useContext, Fragment } from 'react';
import { auth } from '../../firebase';
import {
  Button,
  Header,
  Image,
  Form,
  Segment,
  Container,
  Grid,
  Dimmer,
  Loader,
  Message,
  GridColumn,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { setPasswordContext } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (email === '' || password === '') {
      setError('Você precisa preencher todos os campos !');
      setLoading(false);
    } else {
      try {
        await setPasswordContext(password);
        await auth.signInWithEmailAndPassword(email, password);
        setLoading(false);
        history.push('/menu');
      } catch (error) {
        setLoading(false);
        console.log(error.code);
        switch (error.code) {
          case 'auth/requires-recent-login':
            setError(
              'Essa operação é sensivel e precisa de uma autenticação recente.'
            );
            break;
          case 'auth/user-not-found':
            setError(
              'Não há nenhum registro de usuário correspondente a este identificador. O usuário pode ter sido excluído'
            );
            break;
          case 'auth/wrong-password':
            setError('A senha é inválida ou o usuário não tem uma senha.');
            break;
          default:
            setError('Ocorreu um erro, tente novamente.');
            break;
        }
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={4}></GridColumn>
          <GridColumn mobile={16} computer={8}>
            <Segment
              style={{ marginTop: '70px' }}
              placeholder
              color='black'
              padded='very'
            >
              {loading && (
                <Dimmer active inverted>
                  <Loader size='large' inverted>
                    Entrando...
                  </Loader>
                </Dimmer>
              )}
              <Header as='h2' icon textAlign='center'>
                {error && <Message color='red'>{error}</Message>}
                <Image
                  size='massive'
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Flogin_img.gif?alt=media&token=3d7a7b02-1c67-4398-b1c6-6b6fd67f69a6'
                />
                <Header.Content>Login</Header.Content>
              </Header>
              <Form onSubmit={handleLogin}>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                  />
                </Form.Field>
                <Form.Field>
                  <label>Senha</label>
                  <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Senha'
                  />
                </Form.Field>
                <Button secondary type='submit'>
                  Confirmar
                </Button>
              </Form>
            </Segment>
          </GridColumn>
          <GridColumn width={4}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Login;
