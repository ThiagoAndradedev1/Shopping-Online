import React, { Fragment, useContext, useEffect } from 'react';
import {
  Container,
  Menu,
  Image,
  Icon,
  Label,
  Button,
  Dropdown,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../../firebase';
import CalculationContext from '../../context/calculation/calculationContext';
import AuthContext from '../../context/authentication/authContext';
import { useState } from 'react';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { transactions } = useContext(CalculationContext);

  // const amounts = transactions.map((transaction) => transaction.labelCount);
  // const total = amounts.reduce((acc, item) => (acc += item), 0);

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

  return (
    <Fragment>
      <Menu borderless fixed='top' size='tiny' color='red' inverted>
        <Container text>
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
              {transactions.length}
              {/* {transactions.length === 0 && 1}
              {transactions.length > 0 && transactions.length} */}
            </Label>
          </Menu.Item>
        </Container>
        <Container text>
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
        </Container>
      </Menu>
    </Fragment>
  );
};

export default Navbar;
