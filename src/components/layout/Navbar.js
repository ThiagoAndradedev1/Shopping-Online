import React, { Fragment, useContext } from 'react';
import { Container, Menu, Image, Icon, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CalculationContext from '../../context/calculation/calculationContext';

const Navbar = () => {
  const { transactions } = useContext(CalculationContext);

  const amounts = transactions.map((transaction) => transaction.labelCount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

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
          <Menu.Item as='a'>Sobre</Menu.Item>
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
              {/* <Dropdown.Item>
                <Icon name='user' />{' '}
                <Dropdown text='Olá, entre ou cadastre-se' floating>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button.Group>
                        <Button as={Link} to='/login' color='black'>
                          Login
                        </Button>
                        <Button.Or text='ou' />
                        <Button
                          onClick={() => setShowLogin(true)}
                          as={Link}
                          to='/signup'
                        >
                          Signup
                        </Button>
                      </Button.Group>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Item> */}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </Fragment>
  );
};

export default Navbar;
