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
  GridRow,
} from 'semantic-ui-react';
import { firestore } from '../firebase';

const Cardapio = () => {
  const [firebaseInfo, setFirebaseInfo] = useState([]);
  const [infoFilter, setInfoFilter] = useState([]);
  const [infoModal, setInfoModal] = useState('');
  const [modalState, setModalState] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);

  useEffect(() => {
    firestore
      .collection('menuinfo')
      .orderBy('name', 'asc')
      .onSnapshot((snapshot) => {
        const newInformation = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = newInformation.filter((info) => {
          return info.tag.match('hamburger');
        });
        setFirebaseInfo(newInformation);
        setInfoFilter(filtered);
        // setIngredientesSelecionados(newInformation);
        // console.log(newInformation);
      });
  }, []);

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

  const changePrice = (produto, tamanho, price, buttonActive) => {
    setButtonActive(true);
    const resultado = infoFilter.findIndex(
      (produtoArray) => produtoArray.id === produto.id
    );

    if (resultado !== -1 && tamanho === 'grande') {
      infoFilter[resultado].price = price;
      setInfoFilter([...infoFilter]);
    } else if (resultado !== -1 && tamanho === 'media') {
      infoFilter[resultado].price = price;
      setInfoFilter([...infoFilter]);
    }
  };

  const removeElement = (igr) => {
    console.log(ingredientesSelecionados);
    console.log(igr);
    const retorno = ingredientesSelecionados.findIndex(
      (ingrediente) => ingrediente.id === igr.id
    );

    if (retorno !== -1) {
      const copiaIngredientes = [...ingredientesSelecionados];
      copiaIngredientes.splice(retorno, 1);
      setIngredientesSelecionados([...copiaIngredientes]);
    } else {
      setIngredientesSelecionados([...ingredientesSelecionados, igr]);
    }
  };

  const openModal = (infoItem) => {
    if (infoItem.tag === 'porções') {
      setModalState(false);
    } else {
      console.log(infoItem);
      setModalState(true);
      setInfoModal(infoItem);
      setIngredientesSelecionados(infoItem.ingredientes);
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
              <Button color='red'>Bebidas</Button>
              <Button onClick={() => orderBy('porções')} color='red'>
                Porções
              </Button>
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
                    <Segment style={{ marginTop: '10px' }} textAlign='center'>
                      {infoItem &&
                        infoItem.medidas.map((medida, index) => {
                          return (
                            <Button
                              key={index}
                              onClick={() =>
                                changePrice(
                                  infoItem,
                                  medida.size,
                                  medida.price,
                                  buttonActive
                                )
                              }
                              color='green'
                            >
                              {medida.btnName}
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
                            onClick={() => openModal(infoItem)}
                            color='green'
                          >
                            Comprar
                          </Button>
                        }
                        open={modalState}
                        onClose={() => setModalState(false)}
                      >
                        <Segment
                          style={{ fontSize: '1.33em' }}
                          inverted
                          color='red'
                        >
                          Pizza
                        </Segment>
                        <Modal.Content image>
                          <Grid>
                            <Grid.Column width={4}>
                              <Image
                                spaced='left'
                                wrapped
                                size='medium'
                                src={infoModal.img}
                              />
                              {infoModal &&
                                infoModal.ingredientes.map(
                                  (ingrediente, index) => {
                                    return (
                                      <Checkbox
                                        onChange={() =>
                                          removeElement(ingrediente)
                                        }
                                        key={index}
                                        label={ingrediente.name}
                                        defaultChecked
                                      />
                                    );
                                  }
                                )}
                              <div className='modal-btn-margin'>
                                <Button color='green'>Comprar</Button>
                              </div>
                            </Grid.Column>
                            <Grid.Column width={6}></Grid.Column>
                            <Grid.Column width={6}>
                              {ingredientesSelecionados.map((x) => {
                                return <h3 key={x.id}>{x.name}</h3>;
                              })}
                            </Grid.Column>
                          </Grid>

                          {/* <Grid columns={2} centered>
                            <GridRow>
                              <Grid.Column verticalAlign='middle'>
                                <Image
                                  wrapped
                                  size='medium'
                                  src={infoModal.img}
                                />
                                {infoModal &&
                                  infoModal.ingredientes.map(
                                    (ingrediente, index) => {
                                      return (
                                        <Checkbox
                                          onChange={() =>
                                            removeElement(ingrediente)
                                          }
                                          key={index}
                                          label={ingrediente.name}
                                          defaultChecked
                                        />
                                      );
                                    }
                                  )}
                                <div className='modal-btn-margin'>
                                  <Button color='green'>Comprar</Button>
                                </div>
                              </Grid.Column>
                            </GridRow>
                            <Grid.Column>
                              <GridRow>
                                <Menu fluid vertical>
                                  <Menu.Item className='header'>
                                    {ingredientesSelecionados.map((x) => {
                                      return <h3 key={x.id}>{x.name}</h3>;
                                    })}
                                  </Menu.Item>
                                </Menu.Item>
                              </GridRow>
                            </Grid.Column>
                          </Grid> */}
                          {/* <Image wrapped size='medium' src={infoModal.img} /> */}

                          {/* <Modal.Description>
                            <Header color='red'>{infoModal.name}</Header>
                            <Grid columns={3}>
                              <Grid.Row>
                                <Grid.Column>
                                  {infoModal &&
                                    infoModal.ingredientes.map(
                                      (ingrediente, index) => {
                                        return (
                                          <Checkbox
                                            onChange={() =>
                                              removeElement(ingrediente)
                                            }
                                            key={index}
                                            label={ingrediente.name}
                                            defaultChecked
                                          />
                                        );
                                      }
                                    )}
                                  <div className='modal-btn-margin'>
                                    <Button color='green'>Comprar</Button>
                                  </div>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Modal.Description> */}

                          {/* {ingredientesSelecionados.map((x) => {
                            return <h3 key={x.id}>{x.name}</h3>;
                          })} */}

                          {/* <Grid>
                            <Header color='red'>Ingredientes:</Header>
                            {infoModal && (
                              <Grid.Row columns={3}>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.ingredientes[0].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.ingredientes[1].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.ingredientes[2].image}
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
                                    src={infoModal.ingredientes[3].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.ingredientes[4].image}
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <Image
                                    circular
                                    size='tiny'
                                    src={infoModal.ingredientes[5].image}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            )}
                          </Grid> */}
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
