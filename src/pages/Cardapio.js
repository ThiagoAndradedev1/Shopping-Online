import React, { useState, useEffect, useRef } from 'react';
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
  Label,
  ButtonGroup,
} from 'semantic-ui-react';
import { firestore } from '../firebase';

const Cardapio = () => {
  const [firebaseInfo, setFirebaseInfo] = useState([]);
  const [infoFilter, setInfoFilter] = useState([]);
  const [infoModal, setInfoModal] = useState('');
  const [modalState, setModalState] = useState(false);
  // const [buttonActive, setButtonActive] = useState(false);
  const [activeItem, setActiveItem] = useState('refrigerante');
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [btnActive, setbtnActive] = useState(false);
  const [labelCount, setLabelCount] = useState(1);

  const [tamanhoProduto, setTamanhoProduto] = useState(false);

  useEffect(() => {
    firestore
      .collection('menuinfo')
      .orderBy('tag')
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
    if (text === 'refrigerante' || text === 'agua' || text === 'cerveja') {
      setShowMenu(true);
      setActiveItem(text);
      let filtered = firebaseInfo.filter((info) => {
        return info.tag.match(text);
      });
      setInfoFilter(filtered);
    } else {
      setShowMenu(false);
      let filtered = firebaseInfo.filter((info) => {
        return info.tag.match(text);
      });
      setInfoFilter(filtered);
    }
  };

  const searchBy = (search) => {
    let filtered = firebaseInfo.filter((info) => {
      return info.name.toLowerCase().match(search.toLowerCase());
    });
    setInfoFilter(filtered);
  };

  const changePrice = (produto, tamanho, price) => {
    setTamanhoProduto(!tamanhoProduto);
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

  const removeorAddElement = (igr) => {
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
    if (
      infoItem.tag === 'porções' ||
      infoItem.tag === 'refrigerante' ||
      infoItem.tag === 'agua' ||
      infoItem.tag === 'cerveja'
    ) {
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
              <Button onClick={() => orderBy('Pizza')} color='red'>
                Pizzas
              </Button>
              <Button onClick={() => orderBy('pizzadoce')} color='red'>
                Pizza Doce
              </Button>
              <Button onClick={() => orderBy('refrigerante')} color='red'>
                Bebidas
              </Button>
              <Button onClick={() => orderBy('porções')} color='red'>
                Porções
              </Button>
              <Button color='red'>Condimentos</Button>
              <Button color='red'>Combos</Button>
              <Button onClick={() => orderBy('porções')} color='red'>
                Exibir Todas Opções
              </Button>
            </div>
          </Segment>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Menu attached='top' tabular>
            {showMenu && (
              <Menu.Item
                name='refrigerante'
                onClick={() => orderBy('refrigerante')}
                active={activeItem === 'refrigerante'}
              />
            )}
            {showMenu && (
              <Menu.Item
                name='cerveja'
                onClick={() => orderBy('cerveja')}
                active={activeItem === 'cerveja'}
              />
            )}
            {showMenu && (
              <Menu.Item
                name='agua'
                onClick={() => orderBy('agua')}
                active={activeItem === 'agua'}
              />
            )}
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
                      <Button
                        onClick={() =>
                          changePrice(
                            infoItem,
                            infoItem.medidas[0].size,
                            infoItem.medidas[0].price
                          )
                        }
                        color={tamanhoProduto ? 'green' : 'red'}
                      >
                        {infoItem.medidas[0].btnName}
                      </Button>

                      <Button
                        onClick={() =>
                          changePrice(
                            infoItem,
                            infoItem.medidas[1].size,
                            infoItem.medidas[1].price
                          )
                        }
                        color={!tamanhoProduto ? 'green' : 'red'}
                      >
                        {infoItem.medidas[1].btnName}
                      </Button>

                      {/* {infoItem &&
                        infoItem.medidas.map((medida, index) => {
                          return (
                            <Button
                              // toggle
                              // active={btnActive}
                              key={index}
                              onClick={() =>
                                changePrice(infoItem, medida.size, medida.price)
                              }
                              color={tamanhoProduto ? 'green' : 'red'}
                            >
                              {medida.btnName}
                            </Button>
                          );
                        })} */}
                    </Segment>
                    <Segment>
                      <Image circular size='big' src={infoItem.img} />{' '}
                      {/* <img src={infoItem.img} alt='' /> */}
                      <Header textAlign='center' as='h2' icon>
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
                          {/* <Grid columns={2} padded>
                            <Grid.Column>
                              <img
                                src={infoModal.img}
                                alt='abc'
                                height='150'
                                width='150'
                              />
                              {infoModal &&
                                infoModal.ingredientes.map(
                                  (ingrediente, index) => {
                                    return (
                                      <Checkbox
                                        onChange={() =>
                                          removeorAddElement(ingrediente)
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
                            <Grid.Column>
                              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                            </Grid.Column>
                          </Grid> */}
                          {/* <Grid stackable>
                            <Grid.Column width={4}>
                              <Image
                                spaced='left'
                                wrapped
                                size='medium'
                                src={infoModal.img}
                              />
                              <img
                                src={infoModal.img}
                                alt='abc'
                                height='150'
                                width='150'
                              />
                              <Segment size='mini' textAlign='center'>
                                <h3>Quantidade:</h3>
                                <Button
                                  color='blue'
                                  size='mini'
                                  circular
                                  icon='minus'
                                ></Button>
                                <Label size='large' circular color='red'>
                                  2
                                </Label>
                                <Button
                                  color='blue'
                                  size='mini'
                                  circular
                                  icon='plus'
                                ></Button>
                              </Segment>
                            </Grid.Column>
                            <GridColumn width={3}>
                              <Segment>
                                {infoModal &&
                                  infoModal.ingredientes.map(
                                    (ingrediente, index) => {
                                      return (
                                        <Checkbox
                                          onChange={() =>
                                            removeorAddElement(ingrediente)
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
                              </Segment>
                            </GridColumn>
                            <Grid.Column width={4}></Grid.Column>
                            <Grid.Column width={9}>
                              <Segment textAlign='center'>
                                <h1>hello</h1>
                                {ingredientesSelecionados.map((x) => {
                                  return (
                                    <Image
                                      size='tiny'
                                      src={x.image}
                                      key={x.id}
                                    ></Image>
                                  );
                                })}
                              </Segment>
                            </Grid.Column>
                          </Grid> */}
                          <Grid stackable>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Segment padded size='mini' textAlign='center'>
                                  <Image
                                    centered
                                    circular
                                    wrapped
                                    size='medium'
                                    src={infoModal.img}
                                  />
                                  <Label
                                    size='massive'
                                    circular
                                    color='red'
                                    floating
                                  >
                                    {labelCount}
                                  </Label>
                                  <h3>Quantidade</h3>
                                  <Button
                                    onClick={() =>
                                      setLabelCount(labelCount + 1)
                                    }
                                    size='mini'
                                    circular
                                    icon='plus'
                                  ></Button>

                                  <Button
                                    onClick={() =>
                                      setLabelCount(labelCount - 1)
                                    }
                                    size='mini'
                                    circular
                                    icon='minus'
                                  ></Button>
                                </Segment>
                              </Grid.Column>
                              <Grid.Column width={10}>
                                <Segment padded textAlign='center'>
                                  Ingredientes:
                                  {ingredientesSelecionados.map((x) => {
                                    return (
                                      <Image
                                        centered
                                        size='tiny'
                                        src={x.image}
                                        key={x.id}
                                      ></Image>
                                    );
                                  })}
                                </Segment>
                              </Grid.Column>
                              <Grid.Column width={2}>
                                {infoModal &&
                                  infoModal.ingredientes.map(
                                    (ingrediente, index) => {
                                      return (
                                        <Checkbox
                                          onChange={() =>
                                            removeorAddElement(ingrediente)
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
