import React, { useState, useContext, Fragment } from 'react';
import AnimationContext from '../context/animation/animationContext';
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
} from 'semantic-ui-react';

const Login = () => {
  const transition = 'fly left';
  const { setShowLogin, showLogin } = useContext(AnimationContext);

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
              <Header as='h2' icon textAlign='center'>
                <Image
                  size='massive'
                  src='https://thumbs.gfycat.com/GloomyKeyImpala-size_restricted.gif'
                />
                <Header.Content>Login</Header.Content>
              </Header>
              <Form>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' />
                </Form.Field>
                <Form.Field>
                  <label>Senha</label>
                  <input placeholder='Senha' />
                </Form.Field>
                <Button
                  onClick={() => setShowLogin(false)}
                  secondary
                  type='submit'
                >
                  Confirmar
                </Button>
              </Form>
            </Segment>
            {/* )}
            </Transition.Group> */}
          </GridColumn>
          <GridColumn width={4}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Login;
