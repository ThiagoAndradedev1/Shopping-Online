import React, { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  Grid,
  GridColumn,
  Segment,
  Divider,
  Header,
  Image,
  Input,
  Modal,
  Checkbox,
} from 'semantic-ui-react';
import { firestore } from '../firebase';

const Cardapio = () => {
  const [menuInfo, setMenuInfo] = useState([]);
  const [info, setInfo] = useState([]);
  const [activeItem, setActiveItem] = useState('bio');

  useEffect(() => {
    firestore.collection('menuinfo').onSnapshot((snapshot) => {
      const newInformation = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuInfo(newInformation);
      setInfo(newInformation);
    });
  }, []);

  const orderBy = (text) => {
    let filtered = menuInfo.filter((menu) => {
      return menu.tag.match(text);
    });
    setInfo(filtered);
  };

  const searchBy = (search) => {
    let filtered = menuInfo.filter((menu) => {
      return menu.name.toLowerCase().match(search.toLowerCase());
    });
    setInfo(filtered);
    console.log(menuInfo);
  };

  const alterarPreco = (produto, tamanho) => {
    const resultado = info.findIndex(
      (produtoArray) => produtoArray.id === produto.id
    );

    if (resultado !== -1) {
      info[resultado].price = '50';
      setInfo([...info]);
    }
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Segment secondary>
            <Header as='h2' icon textAlign='center'>
              <Image
                size='massive'
                src='https://media.giphy.com/media/l1J9OJBbfEFY6YCK4/giphy.gif'
              />
              <Header.Content>Nosso Cardápio</Header.Content>
            </Header>
            <Divider />
            <div>
              <Button onClick={() => orderBy('hamburger')} color='red'>
                Hambúrger
              </Button>
              <Button onClick={() => orderBy('pizza')} color='red'>
                Pizzas
              </Button>
              <Button color='red'>Pizza Doce</Button>
              <Button color='red'>Porções</Button>
              <Button color='red'>Bebidas</Button>
              <Button color='red'>Condimentos</Button>
              <Button color='red'>Combos</Button>
              <Button color='red'>Exibir Todas Opções</Button>
            </div>
          </Segment>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Menu attached='top' tabular>
            <Menu.Item
              name='bio'
              onClick={() => setActiveItem('bio')}
              active={activeItem === 'bio'}
            />
            <Menu.Item
              name='photos'
              onClick={() => setActiveItem('photos')}
              active={activeItem === 'photos'}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input
                  onChange={(e) => searchBy(e.target.value)}
                  placeholder='Pesquisa...'
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment attached='bottom'>
            <Grid stackable columns={3}>
              <Grid.Row>
                {info.map((info) => (
                  <Grid.Column key={info.id}>
                    <Segment textAlign='center'>
                      <Button onClick={() => alterarPreco(info)} color='green'>
                        Media
                      </Button>
                      <Button onClick={() => alterarPreco(info)} color='green'>
                        Grande
                      </Button>
                    </Segment>
                    <Segment>
                      <Image circular size='big' src={info.img} />{' '}
                      <Header as='h2' icon>
                        {info.name}
                        <Header.Subheader>{info.description}</Header.Subheader>
                        <span>${info.price} </span>
                      </Header>
                    </Segment>
                    <Segment textAlign='center'>
                      <Modal trigger={<Button color='green'>Comprar</Button>}>
                        <Modal.Header>Hambúrger</Modal.Header>
                        <Modal.Content image>
                          <Image
                            wrapped
                            size='medium'
                            src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
                          />

                          <Modal.Description>
                            <Header>Cheese Burger</Header>
                            <h3>Ingredientes:</h3>
                            <Checkbox label='Alface' defaultChecked />
                            <Checkbox
                              label='This checkbox comes pre-checked'
                              defaultChecked
                            />
                            <Checkbox
                              label='This checkbox comes pre-checked'
                              defaultChecked
                            />
                            <Checkbox
                              label='This checkbox comes pre-checked'
                              defaultChecked
                            />
                            <Checkbox
                              label='This checkbox comes pre-checked'
                              defaultChecked
                            />
                            <Checkbox
                              label='This checkbox comes pre-checked'
                              defaultChecked
                            />
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                      {/* <Button color='green'>Comprar</Button> */}
                    </Segment>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Segment>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
    </div>
  );
};

export default Cardapio;
