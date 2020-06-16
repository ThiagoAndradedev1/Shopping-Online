import React, { Fragment, useState } from 'react';
import {
  Segment,
  Container,
  Grid,
  GridColumn,
  Header,
  Image,
  Divider,
  Icon,
  Form,
  Button,
  Modal,
} from 'semantic-ui-react';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment className='body'>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn width={10}>
            <Segment
              raised
              textAlign='center'
              style={{ marginTop: '120px', padding: '40px' }}
            >
              <Header as='h2'>
                <Image
                  circular
                  src='https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
                />{' '}
                Perfil
              </Header>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Nome</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h1>João Paulo</h1>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => setShowModal(true)} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Email</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h3>joãopaulo@gmail.com</h3>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => setShowModal(true)} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Número</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h3></h3>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => setShowModal(true)} color='red'>
                    Adicionar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Senha</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h1>********</h1>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => setShowModal(true)} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>CPF</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h1></h1>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => setShowModal(true)} color='red'>
                    Adicionar
                  </Button>
                </GridColumn>
              </Grid>
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
        <Modal
          style={{ padding: '15px' }}
          size='tiny'
          open={showModal}
          onClose={() => setShowModal(false)}
          centered={true}
          closeIcon
        >
          <Modal.Content>
            <Header textAlign='center' as='h2'>
              <Image
                centered
                circular
                src='https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
              />{' '}
              Alterar Informações
            </Header>
            <Form size='large'>
              <Form.Field>
                <label>Nome</label>
                <input placeholder='Nome' />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <label>Número</label>
                <input placeholder='Número' />
              </Form.Field>
              <Form.Field>
                <label>Senha</label>
                <input placeholder='Senha' />
              </Form.Field>
              <Form.Field>
                <label>CPF</label>
                <input placeholder='CPF' />
              </Form.Field>
              <Grid>
                <Grid.Column textAlign='center'>
                  <Button style={{ padding: '15px' }} type='submit' secondary>
                    Confirmar
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Modal.Content>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Profile;
