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

  const total = transactions.reduce(
    (prevVal, elem) => prevVal + elem.labelCount,
    0
  );

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

  const logOut = async () => {
    await auth.signOut();
  };

  const options = [
    { key: 'user', text: 'Perfil', icon: 'user', as: Link, to: '/profile' },
    {
      key: 'settings',
      text: 'Compras',
      icon: 'settings',
      as: Link,
      to: '/orders',
    },
    { key: 'sign-out', text: 'Sair', icon: 'sign out' },
  ];

  const trigger = (
    <span>
      <Image avatar src={userInfo.image} /> Olá, {userInfo.name}!
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
              src='https://i.pinimg.com/originals/6a/27/ac/6a27ac5560df47ec8bb998051b74b1f0.png'
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
                src='https://i.pinimg.com/originals/6a/27/ac/6a27ac5560df47ec8bb998051b74b1f0.png'
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
                {/* {transactions.length} */}
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
                  <Dropdown
                    trigger={trigger}
                    options={options}
                    pointing='top'
                    icon={null}
                  />
                )}
                <Button onClick={logOut}>Sair</Button>
              </Menu.Item>
            </Menu.Menu>
          </Responsive>
        </Container>

        <Responsive className='flex-item-button' {...Responsive.onlyMobile}>
          {/* <Button>Click me</Button> */}
          <Button onClick={() => setSideBarVisible(true)} color='red'>
            <Icon name='sidebar' size='large' />
          </Button>
        </Responsive>
      </Menu>
    </Fragment>
  );
};

export default Navbar;
