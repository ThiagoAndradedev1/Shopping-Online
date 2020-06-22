import React, { useState, useContext, Fragment } from 'react';
import { auth, firestore } from '../../firebase';
import {
  Button,
  Header,
  Image,
  Form,
  Segment,
  Container,
  Grid,
  GridColumn,
  Message,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (name === '' || email === '' || password === '') {
      setError('Você precisa preencher todos os campos !');
      setLoading(false);
    } else {
      try {
        const response = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await firestore.collection('userinfo').doc(response.user.uid).set({
          email,
          name,
          image:
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
          number: '',
          cpf: '',
        });
        await auth.signOut();
        history.push('/login');
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
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
                    Criando Conta...
                  </Loader>
                </Dimmer>
              )}
              <Header as='h2' icon textAlign='center'>
                {error && <Message color='red'>{error}</Message>}
                <Image size='massive' src='https://i.gifer.com/ZF6F.gif' />
                <Header.Content>Signup</Header.Content>
              </Header>

              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Nome</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Nome'
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder='Email'
                  />
                </Form.Field>
                <Form.Field>
                  <label>Senha</label>
                  <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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

export default Signup;
