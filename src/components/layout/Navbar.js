import React, { Fragment, useContext, useEffect } from 'react';
import {
  Container,
  Menu,
  Image,
  Icon,
  Label,
  Button,
  Dropdown,
  Responsive,
  Sidebar,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../../firebase';
import CalculationContext from '../../context/calculation/calculationContext';
import AuthContext from '../../context/authentication/authContext';
import { useState } from 'react';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState('');
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { transactions } = useContext(CalculationContext);

  const amounts = transactions.map((transaction) => transaction.labelCount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

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
      console.log(total);
      returnDocument();
    }
  }, [currentUser, total]);

  const logOut = async () => {
    await auth.signOut();
  };

  const trigger = (
    <span>
      <Image avatar src={userInfo?.image} /> Olá, {userInfo?.name}!
    </span>
  );

  const mobileLogOut = async () => {
    setSideBarVisible(false);
    await auth.signOut();
  };

  return (
    <Fragment>
      <Menu
        borderless
        size='tiny'
        color='red'
        inverted
        className='flex'
        attached
      >
        <Responsive {...Responsive.onlyMobile}>
          <Menu.Item>
            <Image
              size='small'
              src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fhamburger_logo.png?alt=media&token=95e68b2a-7996-4cfc-8e77-178073552746'
            />{' '}
          </Menu.Item>
        </Responsive>
        <Responsive as={Fragment} {...Responsive.onlyMobile}>
          <Sidebar
            as={Menu}
            color='black'
            direction='left'
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            onHide={() => setSideBarVisible(false)}
            visible={sideBarVisible}
            width='thin'
          >
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/home'
            >
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/menu'
            >
              <Icon name='food' />
              Cardápio
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/about'
            >
              <Icon name='question circle outline' />
              Sobre
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/cart'
            >
              <Icon name='cart' />
              Carrinho
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/profile'
            >
              <Icon name='user outline' />
              Perfil
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/signup'
            >
              <Icon name='sign-in' />
              Cadastrar
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/login'
            >
              <Icon name='long arrow alternate right' />
              Entrar
            </Menu.Item>
            <Menu.Item
              onClick={() => setSideBarVisible(false)}
              as={Link}
              to='/orders'
            >
              <Icon name='long arrow alternate right' />
              Pedidos
            </Menu.Item>
            <Menu.Item onClick={() => mobileLogOut()} as={Link} to='/login'>
              <Icon name='sign-out' />
              Sair
            </Menu.Item>
          </Sidebar>
        </Responsive>

        <Container text>
          <Responsive as={Fragment} minWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Item>
              <Image
                size='mini'
                src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fhamburger_logo.png?alt=media&token=95e68b2a-7996-4cfc-8e77-178073552746'
              />
            </Menu.Item>
            <Menu.Item header>Hamburgeria</Menu.Item>
            <Menu.Item as={Link} to='/home'>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to='/menu'>
              Cardápio
            </Menu.Item>
            <Menu.Item as={Link} to='/about'>
              Sobre
            </Menu.Item>
            <Menu.Item as={Link} to='/cart'>
              <Icon name='cart' /> Carrinho
              <Label circular color='black'>
                {total}
              </Label>
            </Menu.Item>
          </Responsive>
        </Container>
        <Container text>
          <Responsive as={Fragment} minWidth={Responsive.onlyComputer.minWidth}>
            <Menu.Menu position='right'>
              <Menu.Item>
                {!currentUser && (
                  <div>
                    <Link to='/login'>
                      <Button color='black'>Log In</Button>
                    </Link>
                    <Link to='/signup'>
                      <Button style={{ marginLeft: '0.5em' }} color='black'>
                        Registrar
                      </Button>
                    </Link>
                  </div>
                )}
                {currentUser && (
                  <Dropdown trigger={trigger} pointing className='link item'>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to='/profile'>
                        <Icon name='user' />
                        Perfil
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to='/orders'>
                        {' '}
                        <Icon name='money bill alternate' />
                        Compras
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logOut}>
                        <Icon name='sign out' /> Sair
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </Menu.Item>
            </Menu.Menu>
          </Responsive>
        </Container>

        <Responsive className='flex-item-button' {...Responsive.onlyMobile}>
          <Button onClick={() => setSideBarVisible(true)} color='red'>
            <Icon name='sidebar' size='large' />
          </Button>
        </Responsive>
      </Menu>
    </Fragment>
  );
};

export default Navbar;
