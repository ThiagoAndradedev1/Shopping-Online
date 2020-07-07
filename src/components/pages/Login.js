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
import { returnErrorFromFirebase } from '../../utils/utils';

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
        setError(returnErrorFromFirebase(error.code));
        // setError(error.message);
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={4}></GridColumn>
          <GridColumn width={8}>
            <Segment
              style={{ marginTop: '170px' }}
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
                  src='https://thumbs.gfycat.com/GloomyKeyImpala-size_restricted.gif'
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
