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
  const [firebaseInfo, setFirebaseInfo] = useState([]);
  const [infoFilter, setInfoFilter] = useState([]);
  const [infoModal, setInfoModal] = useState('');
  const [buttonActive, setButtonActive] = useState(false);
  const [activeItem, setActiveItem] = useState('bio');
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

  useEffect(() => {
    firestore.collection('menuinfo').onSnapshot((snapshot) => {
      const newInformation = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtered = newInformation.filter((info) => {
        return info.tag.match('hamburger');
      });
      setFirebaseInfo(newInformation);
      setInfoFilter(filtered);
      setIngredientesSelecionados(firebaseInfo.igredients);
    });
  }, [firebaseInfo.igredients]);

  const orderBy = (text) => {
    let filtered = firebaseInfo.filter((info) => {
      return info.tag.match(text);
    });
    setInfoFilter(filtered);
  };

  const searchBy = (search) => {
    let filtered = firebaseInfo.filter((info) => {
      return info.name.toLowerCase().match(search.toLowerCase());
    });
    setInfoFilter(filtered);
  };

  const changePrice = (produto, tamanho) => {
    // setButtonActive((prevState) => ({ active: !prevState.active }));
    const resultado = infoFilter.findIndex(
      (produtoArray) => produtoArray.id === produto.id
    );

    if (resultado !== -1 && tamanho === 'grande') {
      infoFilter[resultado].price = '50';
      setInfoFilter([...infoFilter]);
    } else if (resultado !== -1 && tamanho === 'media') {
      infoFilter[resultado].price = '19.90';
      setInfoFilter([...infoFilter]);
    }
  };

  // const addOrRemoveIngrediente = (ingrediente) => {
  //   const resultado = ingredientesSelecionados.findIndex(
  //     (ingredienteSelecionado) => ingredienteSelecionado.id === ingrediente.id
  //   );

  //   if (resultado !== -1) {
  //     delete ingredientesSelecionados[resultado];
  //     setIngredientesSelecionados([...ingredientesSelecionados]);
  //   } else {
  //     setIngredientesSelecionados([...ingredientesSelecionados, ingrediente]);
  //   }
  // };

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
            {/* <Menu.Item
              name='bio'
              onClick={() => setActiveItem('bio')}
              active={activeItem === 'bio'}
            />
            <Menu.Item
              name='photos'
              onClick={() => setActiveItem('photos')}
              active={activeItem === 'photos'}
            /> */}
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
                {infoFilter.map((infoItem) => (
                  <Grid.Column key={infoItem.id}>
                    <Segment textAlign='center'>
                      {infoItem &&
                        infoItem.medidas.map((medida) => {
                          return (
                            <Button
                              toggle
                              active={buttonActive}
                              onClick={() =>
                                changePrice(infoItem, medida.opção)
                              }
                              color='green'
                            >
                              {medida.size}
                            </Button>
                          );
                        })}
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
                        <Modal.Content image>
                          <Image wrapped size='medium' src={infoModal.img} />

                          <Modal.Description>
                            <Header color='red'>{infoModal.name}</Header>
                            <Grid columns={3}>
                              <Grid.Row>
                                <Grid.Column>
                                  {infoModal &&
                                    infoModal.igredientes.map(
                                      (igrediente, index) => {
                                        return (
                                          <Checkbox
                                            // onChange={() =>
                                            //   addOrRemoveIngrediente(
                                            //     ingredientesSelecionados
                                            //   )
                                            // }
                                            key={index}
                                            label={igrediente.name}
                                            defaultChecked
                                          />
                                        );
                                      }
                                    )}
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                            <div className='modal-btn-margin'>
                              <Button color='green'>Comprar</Button>
                            </div>
                          </Modal.Description>
                          <Grid>
                            <Header color='red'>Igredientes:</Header>
                            {infoModal && (
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[0].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[1].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[2].image}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            )}
                            {infoModal && (
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[3].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[4].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.igredientes[5].image}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            )}
                          </Grid>
                        </Modal.Content>
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
