import React, { useState, useContext, Fragment } from 'react';

import {
  Button,
  Header,
  Image,
  Form,
  Segment,
  Container,
  Grid,
  GridColumn,
} from 'semantic-ui-react';

const Login = () => {
  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={4}></GridColumn>
          <GridColumn width={8}>
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
