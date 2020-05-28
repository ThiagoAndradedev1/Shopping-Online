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
  const [infoModal, setInfoModal] = useState('');
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
                {info.map((infoItem) => (
                  <Grid.Column key={infoItem.id}>
                    <Segment textAlign='center'>
                      <Button
                        onClick={() => alterarPreco(infoItem)}
                        color='green'
                      >
                        Media
                      </Button>
                      <Button
                        onClick={() => alterarPreco(infoItem)}
                        color='green'
                      >
                        Grande
                      </Button>
                    </Segment>
                    <Segment>
                      <Image circular size='big' src={infoItem.img} />{' '}
                      <Header as='h2' icon>
                        {infoItem.name}
                        <Header.Subheader>
                          {infoItem.description}
                        </Header.Subheader>
                        <span>${infoItem.price} </span>
                      </Header>
                    </Segment>
                    <Segment textAlign='center'>
                      <Modal
                        trigger={
                          <Button
                            onClick={() => setInfoModal(infoItem)}
                            color='green'
                          >
                            Comprar
                          </Button>
                        }
                      >
                        <Segment
                          style={{ fontSize: '1.33em' }}
                          inverted
                          color='red'
                        >
                          Pizza
                        </Segment>

                        {/* <Grid columns={2} padded>
                          <Grid.Column>
                            <Modal.Content image>
                              <Image
                                wrapped
                                size='medium'
                                src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fd149940ba70c191927875f0c68825c42.png?alt=media&token=70b10df5-4aca-40e9-a4a0-e630ab4083c2'
                              />

                              <Modal.Description>
                                <Header color='red'>{infoModal.name}</Header>
                                <Grid columns={3}>
                                  <Grid.Row>
                                    <Grid.Column>
                                      <Checkbox label='Alface' defaultChecked />
                                      <Checkbox
                                        label='Barbecue'
                                        defaultChecked
                                      />
                                      <Checkbox
                                        label='Cheddar'
                                        defaultChecked
                                      />
                                      <Checkbox label='Picles' defaultChecked />
                                      <Checkbox
                                        label='Maionese'
                                        defaultChecked
                                      />
                                      <Checkbox label='Bacon' defaultChecked />
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                                <div className='modal-btn-margin'>
                                  <Button color='green'>Comprar</Button>
                                </div>
                              </Modal.Description>
                            </Modal.Content>
                          </Grid.Column>
                          <Grid.Column>
                            <Header color='red'>Igredientes:</Header>
                            <Image.Group size='small'>
                              <Image
                                size='small'
                                circular
                                src='https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-green-vegetables-vegetable-illustration-hand-drawn-vegetables-hand-drawn-lettuce-png-image_453446.jpg'
                              />
                              <Image
                                size='small'
                                circular
                                src='https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-green-vegetables-vegetable-illustration-hand-drawn-vegetables-hand-drawn-lettuce-png-image_453446.jpg'
                              />
                              <Image
                                size='small'
                                circular
                                src='https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-green-vegetables-vegetable-illustration-hand-drawn-vegetables-hand-drawn-lettuce-png-image_453446.jpg'
                              />
                              <Image
                                size='small'
                                circular
                                src='https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-green-vegetables-vegetable-illustration-hand-drawn-vegetables-hand-drawn-lettuce-png-image_453446.jpg'
                              />
                            </Image.Group>
                          </Grid.Column>
                        </Grid> */}

                        <Modal.Content image>
                          <Image
                            wrapped
                            size='medium'
                            src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fd149940ba70c191927875f0c68825c42.png?alt=media&token=70b10df5-4aca-40e9-a4a0-e630ab4083c2'
                          />

                          <Modal.Description>
                            <Header color='red'>{infoModal.name}</Header>
                            <Grid columns={3}>
                              <Grid.Row>
                                <Grid.Column>
                                  <Checkbox label='Alface' defaultChecked />
                                  <Checkbox label='Bacon' defaultChecked />
                                  <Checkbox label='Barbecue' defaultChecked />
                                  <Checkbox label='Cheddar' defaultChecked />
                                  <Checkbox label='Picles' defaultChecked />
                                  <Checkbox label='Maionese' defaultChecked />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <div className='modal-btn-margin'>
                              <Button color='green'>Comprar</Button>
                            </div>
                          </Modal.Description>
                          <Grid>
                            <Header color='red'>Igredientes:</Header>
                            <Grid.Row columns={3}>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://i.pinimg.com/originals/8f/c8/78/8fc8782ce11aaf088065593ad1c47f75.jpg'
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8mTq9H6KmgY1YahUnLxh1F6QxVvEvgeI_d83V_bM5GeaX61eb&usqp=CAU'
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8mTq9H6KmgY1YahUnLxh1F6QxVvEvgeI_d83V_bM5GeaX61eb&usqp=CAU'
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://vistapointe.net/images/bacon-10.jpg'
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://3.bp.blogspot.com/-cwDD6MrtIF4/WYh2Rr8LKJI/AAAAAAAAK1s/fD32DF2fKLY2eMHAlYi9hyCz0dLz1wyZwCLcBGAs/s640/molho-barbecue-545x306.png'
                                />
                              </Grid.Column>
                              <Grid.Column>
                                <Image
                                  circular
                                  size='tiny'
                                  src='https://3.bp.blogspot.com/-cwDD6MrtIF4/WYh2Rr8LKJI/AAAAAAAAK1s/fD32DF2fKLY2eMHAlYi9hyCz0dLz1wyZwCLcBGAs/s640/molho-barbecue-545x306.png'
                                />
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Modal.Content>

                        {/* <Modal.Content image>
                          <Image
                            wrapped
                            size='medium'
                            src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fd149940ba70c191927875f0c68825c42.png?alt=media&token=70b10df5-4aca-40e9-a4a0-e630ab4083c2'
                          />

                          <Modal.Description>
                            <Header color='red'>{infoModal.name}</Header>
                            <Grid columns={3}>
                              <Grid.Row>
                                <Grid.Column>
                                  <Checkbox label='Alface' defaultChecked />
                                  <Checkbox label='Bacon' defaultChecked />
                                  <Checkbox label='Barbecue' defaultChecked />
                                  <Checkbox label='Cheddar' defaultChecked />
                                  <Checkbox label='Picles' defaultChecked />
                                  <Checkbox label='Maionese' defaultChecked />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <div className='modal-btn-margin'>
                              <Button color='green'>Comprar</Button>
                            </div>
                          </Modal.Description>
                        </Modal.Content> */}
                      </Modal>
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
