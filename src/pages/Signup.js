import React, { useState, useContext, Fragment } from 'react';
import AnimationContext from '../context/animation/animationContext';
import { auth, firestore } from '../firebase';
import {
  Button,
  Header,
  Image,
  Checkbox,
  Form,
  Segment,
  Container,
  Grid,
  GridColumn,
  Transition,
  Message,
  Dimmer,
  Icon,
  Loader,
} from 'semantic-ui-react';

const Signup = () => {
  // const transition = 'fly left';
  const { setShowLogin, showLogin } = useContext(AnimationContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    if (name === '' || email === '' || password === '') {
      setError('Você precisa preencher todos os campos !');
    } else {
      e.preventDefault();
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
        });
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={4}></GridColumn>
          <GridColumn width={8}>
            {/* <Transition.Group animation={transition} duration={800}>
              {showLogin && ( */}
            <Segment
              style={{ marginTop: '250px' }}
              placeholder
              color='black'
              padded='very'
            >
              {loading && (
                <Dimmer active inverted>
                  <Loader size='large' inverted>
                    Alterando Informações...
                  </Loader>
                </Dimmer>
              )}
              <Header as='h2' icon textAlign='center'>
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
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder='Senha'
                  />
                </Form.Field>
                {/* <Form.Field>
                  <Checkbox label='Eu concordo com os termos e condições' />
                </Form.Field> */}
                <Button
                  onClick={() => setShowLogin(false)}
                  secondary
                  type='submit'
                >
                  Confirmar
                </Button>
              </Form>
            </Segment>
            {/* )} */}
            {/* </Transition.Group> */}
          </GridColumn>
          <GridColumn width={4}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Signup;
