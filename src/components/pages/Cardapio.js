import React, { useState, useEffect, Fragment, useContext } from 'react';
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
  Label,
  Responsive,
  Sidebar,
} from 'semantic-ui-react';
import { firestore } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import calculationContext from '../../context/calculation/calculationContext';
import { toast } from 'react-toastify';
toast.configure();

const Cardapio = () => {
  const [firebaseInfo, setFirebaseInfo] = useState([]);
  const [infoFilter, setInfoFilter] = useState([]);
  const [infoModal, setInfoModal] = useState('');
  const [modalState, setModalState] = useState(false);
  const [activeItem, setActiveItem] = useState('refrigerante');
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [labelCount, setLabelCount] = useState(1);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const { addTransaction, transactions, updateTransacation } = useContext(
    calculationContext
  );

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
      });
  }, []);

  const orderBy = (text) => {
    console.log(text);
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
      console.log(filtered);
      console.log(firebaseInfo);
      setInfoFilter(filtered);
    }
  };

  const orderByAll = (text) => {
    let filtered = firebaseInfo.filter((info) => {
      return info.tagAll.match(text);
    });
    setInfoFilter(filtered);
  };

  const searchBy = (search) => {
    let filtered = firebaseInfo.filter((info) => {
      return info.name.toLowerCase().match(search.toLowerCase());
    });
    setInfoFilter(filtered);
  };

  const changePrice = (produto, tamanho, price) => {
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

  const removeorAddIngrediente = (igr) => {
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

  const openModal = (infoItem, price, labelCount) => {
    if (
      infoItem.tag === 'porcoes' ||
      infoItem.tag === 'refrigerante' ||
      infoItem.tag === 'agua' ||
      infoItem.tag === 'cerveja' ||
      infoItem.tag === 'combo' ||
      infoItem.tag === 'condimentos' ||
      infoItem.tag === 'porções'
    ) {
      notify();
      setModalState(false);
      const resultado = transactions.findIndex(
        (transaction) => transaction.infoModal.name === infoItem.name
      );
      if (resultado !== -1) {
        const upTransaction = { ...transactions[resultado] };

        upTransaction.labelCount = labelCount += upTransaction.labelCount;
        upTransaction.productPrice = upTransaction.productPrice += Number(
          price
        );

        updateTransacation(upTransaction, resultado);
      } else {
        const newTransaction = {
          id: uuidv4(),
          labelCount,
          price: price * labelCount,
          infoModal: infoItem,
          initialPrice: Number(price),
        };

        addTransaction(newTransaction);
      }
    } else {
      setModalState(true);
      setInfoModal(infoItem);
      setIngredientesSelecionados(infoItem.ingredientes);
    }
  };

  const closeModal = () => {
    setLabelCount(1);
    setModalState(false);
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

  const notify = () => {
    toast.success('🛒 Produto adicionado ao carrinho...');
  };

  const buyProduct = async (price, labelCount) => {
    notify();
    setModalState(false);
    const resultado = transactions.findIndex(
      (transaction) => transaction.infoModal.name === infoModal.name
    );
    if (resultado !== -1) {
      const upTransaction = { ...transactions[resultado] };

      upTransaction.labelCount = labelCount += upTransaction.labelCount;
      upTransaction.productPrice = upTransaction.productPrice += Number(price);

      updateTransacation(upTransaction, resultado);
    } else {
      const newTransaction = {
        id: uuidv4(),
        labelCount,
        price: price * labelCount,
        infoModal,
        initialPrice: Number(price),
        ingredientesSelecionados,
      };
      addTransaction(newTransaction);
    }
    setLabelCount(1);
  };

  const square = { width: 175, height: 175 };

  const sideBarOrderBy = (info) => {
    orderBy(info);
    setSideBarVisible(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Grid columns={3}>
        <Responsive as={Fragment} {...Responsive.onlyMobile}>
          <Sidebar
            style={{ textAlign: 'center' }}
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
            <Menu.Item as={Button} onClick={() => sideBarOrderBy('hamburger')}>
              Hamburger
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => sideBarOrderBy('Pizza')}>
              Pizza
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => sideBarOrderBy('pizzadoce')}>
              Pizzas Doces
            </Menu.Item>
            <Menu.Item
              as={Button}
              onClick={() => sideBarOrderBy('refrigerante')}
            >
              Bebidas
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => sideBarOrderBy('porções')}>
              Porções
            </Menu.Item>
            <Menu.Item
              as={Button}
              onClick={() => sideBarOrderBy('condimentos')}
            >
              Condimentos
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => sideBarOrderBy('combo')}>
              Combos
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => orderByAll('allDocuments')}>
              Todas Opções
            </Menu.Item>
          </Sidebar>
        </Responsive>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Responsive as={Fragment} {...Responsive.onlyMobile}>
            <Segment inverted color='red' circular style={square}>
              <Header as='h2'>
                <Image
                  size='massive'
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fhamburger_cardapio_mobile.png?alt=media&token=41a1098d-fd56-44dc-bc86-c06b06c9c1b7'
                />
                Nosso Cardápio
                <Header.Subheader as={Button}></Header.Subheader>
              </Header>
              <Button
                onClick={() => setSideBarVisible(true)}
                size='large'
                style={{ fontSize: '0.93em' }}
                color='red'
              >
                Ver mais...
              </Button>
            </Segment>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <Input
              style={{ marginTop: '50px' }}
              onChange={(e) => searchBy(e.target.value)}
              fluid
              size='big'
              placeholder='Pesquisa...'
            />
          </Responsive>
          <Responsive as={Fragment} {...Responsive.onlyComputer}>
            <Segment secondary>
              <Header as='h2' icon textAlign='center'>
                <Image
                  size='massive'
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fcardapio_gif.gif?alt=media&token=d6347a90-fed4-4dc3-82ca-1a872f8a6b73'
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
                <Button onClick={() => orderBy('condimentos')} color='red'>
                  Condimentos
                </Button>
                <Button onClick={() => orderBy('combo')} color='red'>
                  Combos
                </Button>
                <Button onClick={() => orderByAll('allDocuments')} color='red'>
                  Exibir Todas Opções
                </Button>
              </div>
            </Segment>
          </Responsive>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
      <Grid columns={3}>
        <GridColumn computer={4}></GridColumn>
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
              <Responsive {...Responsive.onlyComputer}>
                <Menu.Item>
                  <Input
                    onChange={(e) => searchBy(e.target.value)}
                    placeholder='Pesquisa...'
                  />
                </Menu.Item>
              </Responsive>
            </Menu.Menu>
          </Menu>

          <Segment raised attached='bottom'>
            <Grid stackable columns={3}>
              <Grid.Row>
                {infoFilter.map((infoItem) => (
                  <Grid.Column key={infoItem.id}>
                    {!(
                      infoItem.tag === 'combo' || infoItem.tag === 'condimentos'
                    ) && (
                      <Fragment>
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
                            color='red'
                          >
                            <Button.Content visible>
                              {infoItem.medidas[0]?.btnName}
                            </Button.Content>
                            <Button.Content hidden>
                              {infoItem.medidas[0]?.btnName}
                            </Button.Content>
                          </Button>

                          <Button
                            animated='fade'
                            onClick={() =>
                              changePrice(
                                infoItem,
                                infoItem.medidas[1]?.size,
                                infoItem.medidas[1]?.price
                              )
                            }
                            color='green'
                          >
                            <Button.Content visible>
                              {infoItem.medidas[1]?.btnName}
                            </Button.Content>
                            <Button.Content hidden>
                              {infoItem.medidas[1]?.btnName}
                            </Button.Content>
                          </Button>
                        </Segment>
                      </Fragment>
                    )}
                    <Segment raised>
                      <Image
                        style={{ minHeight: '250px' }}
                        size='big'
                        src={infoItem.img}
                      />{' '}
                      <Header textAlign='center' as='h2' icon>
                        {infoItem.name}
                        <Header.Subheader>
                          {infoItem.description}
                        </Header.Subheader>
                        <span>R${infoItem.price} </span>
                      </Header>
                    </Segment>
                    <Segment
                      style={{ marginBottom: '25px' }}
                      raised
                      textAlign='center'
                    >
                      <Modal
                        dimmer={true}
                        trigger={
                          <Button
                            animated='fade'
                            onClick={() =>
                              openModal(infoItem, infoItem.price, labelCount)
                            }
                            color='red'
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
                          {infoModal.modalHeader}
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

                                  {ingredientesSelecionados.length === 0 && (
                                    <h1>Sem Ingredientes</h1>
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
                                              removeorAddIngrediente(
                                                ingrediente
                                              )
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
                                                removeorAddIngrediente(
                                                  ingrediente
                                                )
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
                                    <Button
                                      onClick={() =>
                                        buyProduct(infoModal.price, labelCount)
                                      }
                                      color='green'
                                    >
                                      Comprar
                                    </Button>
                                  </div>
                                </Responsive>
                                <Responsive
                                  as={Fragment}
                                  {...Responsive.onlyMobile}
                                >
                                  <div className='modal-btn-margin'>
                                    <Button
                                      onClick={() =>
                                        buyProduct(infoModal.price, labelCount)
                                      }
                                      fluid
                                      color='green'
                                    >
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
