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
  Form,
  Button,
  Modal,
  Message,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

const Profile = () => {
  const { currentUser, setPasswordContext, passwordContext } = useContext(
    AuthContext
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailChange, setEmailChange] = useState('');
  const [passwordChange, setPasswordChange] = useState('');
  const [cpf, setCpf] = useState('');
  const [number, setNumber] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

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
    try {
      setLoading(true);
      setErrorMsg('');
      if (email === '' || name === '') {
        setErrorMsg('O nome é uma campo obrigatório e não pode ficar vazio.');
        setLoading(false);
      } else {
        await firestore.collection('userinfo').doc(currentUser.uid).update({
          email,
          name,
          number,
          cpf,
        });
        setSuccessMsg('Você modificou com sucesso a sua conta!');
        setLoading(false);
        setShowModal(false);
      }
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      if (passwordChange !== '') {
        // await setPasswordContext(passwordChange);
        // await auth.signInWithEmailAndPassword(userInfo.email, passwordContext);
        await currentUser.updatePassword(passwordChange);
        setSuccessMsg('Você modificou com sucesso a sua conta!');
        setLoading(false);
        setShowPasswordModal(false);
      } else {
        window.alert('Email has been sent to you, Please check and verify.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      if (emailChange !== '') {
        // await auth.signInWithEmailAndPassword(userInfo.email, passwordContext);
        await currentUser.updateEmail(emailChange);
        await firestore.collection('userinfo').doc(currentUser.uid).update({
          email: emailChange,
        });
        setSuccessMsg('Você modificou com sucesso a sua conta!');
        setLoading(false);
        setShowEmailModal(false);
      } else {
        setErrorMsg('Você precissa preencher o campo com o seu novo email!');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setSuccessMsg('');
    setErrorMsg('');
    setName(userInfo.name);
    setEmail(userInfo.email);
    setNumber(userInfo.number);
    setCpf(userInfo.cpf);
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    setSuccessMsg('');
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
    setSuccessMsg('');
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn width={10}>
            <Segment
              raised
              textAlign='center'
              style={{ marginTop: '120px', padding: '40px' }}
            >
              {successMsg && (
                <Message
                  icon='check'
                  success
                  header='Sucesso'
                  content={successMsg}
                />
              )}
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
                  <Button onClick={() => openEmailModal()} color='red'>
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
                  <h3>{userInfo.cpf}</h3>
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
            {errorMsg && (
              <Message
                icon='exclamation triangle'
                negative
                header='Houve um problema'
                content={errorMsg}
              />
            )}
            {loading && (
              <Dimmer active inverted>
                <Loader size='large'>Alterando Informações...</Loader>
              </Dimmer>
            )}
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
              {/* <Form.Field>
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Email'
                />
              </Form.Field> */}
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
            {errorMsg && (
              <Message
                icon='exclamation triangle'
                negative
                header='Houve um problema'
                content={errorMsg}
              />
            )}
            {loading && (
              <Dimmer active inverted>
                <Loader size='large'>Alterando Informações...</Loader>
              </Dimmer>
            )}
            <Header textAlign='center' as='h2'>
              <Image
                centered
                circular
                src='https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
              />{' '}
              Alterar Senha
            </Header>
            <Form onSubmit={handleChangePassword} size='large'>
              <Form.Field>
                <label>Email</label>
                <input
                  onChange={(e) => setPasswordChange(e.target.value)}
                  value={passwordChange}
                  placeholder='Email'
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
        <Modal
          style={{ padding: '15px' }}
          size='tiny'
          open={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          centered={true}
          closeIcon
        >
          <Modal.Content>
            {errorMsg && (
              <Message
                icon='exclamation triangle'
                negative
                header='Houve um problema'
                content={errorMsg}
              />
            )}
            {loading && (
              <Dimmer active inverted>
                <Loader size='large'>Alterando Informações...</Loader>
              </Dimmer>
            )}
            <Header textAlign='center' as='h2'>
              <Image
                centered
                circular
                src='https://img.pngio.com/profile-icon-png-image-free-download-searchpngcom-profile-icon-png-673_673.png'
              />{' '}
              Alterar Email
            </Header>
            <Form onSubmit={handleChangeEmail} size='large'>
              <Form.Field>
                <label>Email</label>
                <input
                  onChange={(e) => setEmailChange(e.target.value)}
                  value={emailChange}
                  placeholder='Email'
                  type='email'
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
