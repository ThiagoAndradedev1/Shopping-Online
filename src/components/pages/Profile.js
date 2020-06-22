import React, { Fragment, useState, useEffect, useContext } from 'react';
import { firestore, auth } from '../../firebase';
import AuthContext from '../../context/authentication/authContext';
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
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [number, setNumber] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const returnDocument = async () => {
        await firestore
          .collection('userinfo')
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            setUserInfo(snapshot.data());
          });
      };
      returnDocument();
    }
  }, [currentUser]);

  const handleChange = async () => {
    auth.sendPasswordResetEmail(password);
    await firestore.collection('userinfo').doc(currentUser.uid).update({
      email,
      name,
      number,
      cpf,
    });
  };

  const openModal = () => {
    setShowModal(true);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setNumber(userInfo.number);
    setCpf(userInfo.cpf);
    setPassword('');
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

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
                  <h1>{userInfo.name}</h1>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => openModal()} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Email</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h3>{userInfo.email}</h3>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => openModal()} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>Número</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h3>{userInfo.number}</h3>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => openModal()} color='red'>
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
                  <Button onClick={() => openPasswordModal()} color='red'>
                    Editar
                  </Button>
                </GridColumn>
              </Grid>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>CPF</Header>
              </Divider>
              <Grid columns={3}>
                <GridColumn width={5}>
                  <h1>{userInfo.cpf}</h1>
                </GridColumn>
                <GridColumn width={6}></GridColumn>
                <GridColumn width={5}>
                  <Button onClick={() => openModal()} color='red'>
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
            <Form onSubmit={handleChange} size='large'>
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
                <label>Número</label>
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder='Número'
                />
              </Form.Field>
              <Form.Field>
                <label>CPF</label>
                <input
                  onChange={(e) => setCpf(e.target.value)}
                  value={cpf}
                  placeholder='CPF'
                />
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
        <Modal
          style={{ padding: '15px' }}
          size='tiny'
          open={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
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
              Alterar Senha
            </Header>
            <Form onSubmit={handleChange} size='large'>
              <Form.Field>
                <label>Senha</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='Senha'
                  type='password'
                />
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
