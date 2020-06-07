import React, { useState, useEffect, useRef, Fragment } from 'react';
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
  Icon,
  Responsive,
  ButtonGroup,
  Sidebar,
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
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [showMensagem, setShowMensagem] = useState(false);

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

  // if (labelCount < 1) {
  //   setLabelCount(1);
  // }

  // if (ingredientesSelecionados.length === 0) {
  //   setShowMensagem(true);
  // }

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

  const closeModal = () => {
    setModalState(false);
    setLabelCount(1);
  };

  const addOrRemoveProduct = (number) => {
    let soma = labelCount;
    if (number === 0) {
      soma += 1;
    } else if (number === 1) {
      soma -= 1;
      if (soma < 1) {
        soma = 1;
      }
    }
    setLabelCount(soma);
  };

  let id0 = 0;
  let id1 = 1;

  return (
    <div style={{ marginTop: '150px' }}>
      <Grid columns={3}>
        <Responsive as={Fragment} {...Responsive.onlyMobile}>
          <Sidebar
            as={Menu}
            color='black'
            direction='right'
            animation='overlay'
            icon='labeled'
            inverted
            vertical
            onHide={() => setSideBarVisible(false)}
            visible={sideBarVisible}
            width='thin'
          >
            <Menu.Item>
              <Fragment>
                <Header inverted as='h2' icon textAlign='center'>
                  <Icon name='users' circular />
                  <Header.Content>Friends</Header.Content>
                </Header>
              </Fragment>
            </Menu.Item>
          </Sidebar>
        </Responsive>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Responsive as={Fragment} {...Responsive.onlyMobile}>
            <Segment raised textAlign='center' secondary>
              <Header as='h2' icon textAlign='center'>
                <Image
                  size='massive'
                  src='https://media.giphy.com/media/l1J9OJBbfEFY6YCK4/giphy.gif'
                />
                <Header.Content>Nosso Cardápio</Header.Content>
              </Header>
              <Divider />
              <div>
                <Button onClick={() => setSideBarVisible(true)} color='red'>
                  Ver Cardapio...
                </Button>
              </div>
            </Segment>
          </Responsive>
          <Responsive as={Fragment} {...Responsive.onlyComputer}>
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
          </Responsive>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn mobile={16} computer={8}>
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

          <Segment raised attached='bottom'>
            <Grid stackable columns={3}>
              <Grid.Row>
                {infoFilter.map((infoItem) => (
                  <Grid.Column key={infoItem.id}>
                    <Segment
                      raised
                      style={{ marginTop: '10px' }}
                      textAlign='center'
                    >
                      <Button
                        animated='fade'
                        onClick={() =>
                          changePrice(
                            infoItem,
                            infoItem.medidas[0].size,
                            infoItem.medidas[0].price
                          )
                        }
                        // color={tamanhoProduto ? 'green' : 'red'}
                        color='red'
                      >
                        <Button.Content visible>
                          {infoItem.medidas[0].btnName}
                        </Button.Content>
                        <Button.Content hidden>
                          {infoItem.medidas[0].btnName}
                        </Button.Content>
                      </Button>

                      <Button
                        animated='fade'
                        onClick={() =>
                          changePrice(
                            infoItem,
                            infoItem.medidas[1].size,
                            infoItem.medidas[1].price
                          )
                        }
                        color='green'
                        // color={!tamanhoProduto ? 'green' : 'red'}
                      >
                        <Button.Content visible>
                          {infoItem.medidas[1].btnName}
                        </Button.Content>
                        <Button.Content hidden>
                          {infoItem.medidas[1].btnName}
                        </Button.Content>
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
                    <Segment raised>
                      <Image
                        style={{ minHeight: '250px' }}
                        size='big'
                        src={infoItem.img}
                      />{' '}
                      {/* <img src={infoItem.img}  alt='' /> */}
                      <Header textAlign='center' as='h2' icon>
                        {infoItem.name}
                        <Header.Subheader>
                          {infoItem.description}
                        </Header.Subheader>
                        <span>${infoItem.price} </span>
                      </Header>
                    </Segment>
                    <Segment raised textAlign='center'>
                      <Modal
                        trigger={
                          <Button
                            animated='fade'
                            onClick={() => openModal(infoItem)}
                            color='green'
                          >
                            <Button.Content visible>Comprar</Button.Content>
                            <Button.Content hidden>Comprar</Button.Content>
                          </Button>
                        }
                        open={modalState}
                        onClose={() => closeModal()}
                      >
                        <Segment
                          style={{ fontSize: '1.33em' }}
                          inverted
                          color='red'
                        >
                          Pizza
                        </Segment>
                        <Modal.Content image>
                          <Grid stackable>
                            <Grid.Row>
                              <Grid.Column width={4}>
                                <Segment
                                  raised
                                  padded
                                  size='mini'
                                  textAlign='center'
                                >
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
                                  <h3>{infoModal.name}</h3>
                                  <h3>${infoModal.price}</h3>
                                  <h3>Quantidade</h3>
                                  <Button
                                    onClick={() => addOrRemoveProduct(1)}
                                    size='mini'
                                    circular
                                    icon='minus'
                                  ></Button>
                                  <Button
                                    onClick={() => addOrRemoveProduct(0)}
                                    size='mini'
                                    circular
                                    icon='plus'
                                  ></Button>
                                </Segment>
                              </Grid.Column>
                              <Grid.Column width={10}>
                                <Segment raised padded textAlign='center'>
                                  <h3>Ingredientes</h3>
                                  {/* <p style={{ fontSize: '1.33em' }}>
                                    Ingredientes:
                                  </p> */}
                                  {ingredientesSelecionados.length === 0 && (
                                    <h1>Sem Ingredientes</h1>
                                  )}
                                  {showMensagem && (
                                    <h1>
                                      Não existe nenhum ingrediente selecionado
                                    </h1>
                                  )}
                                  <Grid columns={3}>
                                    {ingredientesSelecionados.map((x) => {
                                      return (
                                        <Grid.Column key={x.id}>
                                          <Image
                                            centered
                                            size='tiny'
                                            src={x.image}
                                            key={x.id}
                                          ></Image>
                                        </Grid.Column>
                                      );
                                    })}
                                  </Grid>
                                </Segment>
                              </Grid.Column>
                              <Grid.Column width={2}>
                                <Responsive
                                  as={Fragment}
                                  {...Responsive.onlyComputer}
                                >
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
                                </Responsive>

                                <Responsive
                                  as={Fragment}
                                  {...Responsive.onlyMobile}
                                >
                                  <Segment raised textAlign='center'>
                                    {infoModal &&
                                      infoModal.ingredientes.map(
                                        (ingrediente, index) => {
                                          return (
                                            <Checkbox
                                              style={{ margin: '10px' }}
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
                                  </Segment>
                                </Responsive>

                                <Responsive
                                  as={Fragment}
                                  {...Responsive.onlyComputer}
                                >
                                  <div className='modal-btn-margin'>
                                    <Button color='green'>Comprar</Button>
                                  </div>
                                </Responsive>
                                <Responsive
                                  as={Fragment}
                                  {...Responsive.onlyMobile}
                                >
                                  <div className='modal-btn-margin'>
                                    <Button fluid color='green'>
                                      Comprar
                                    </Button>
                                  </div>
                                </Responsive>
                              </Grid.Column>
                            </Grid.Row>
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
