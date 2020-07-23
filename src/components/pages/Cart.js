import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  Button,
  Header,
  Icon,
  Segment,
  Container,
  Grid,
  GridColumn,
  Image,
  Divider,
  Label,
  Modal,
  ModalContent,
  Responsive,
  Checkbox,
} from 'semantic-ui-react';
import { firestore, firebase } from '../../firebase';
import { Link } from 'react-router-dom';
import Pagination from '../layout/Pagination';
import CalculationContext from '../../context/calculation/calculationContext';
import AuthContext from '../../context/authentication/authContext';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [pageIndetification, setpageIndetification] = useState(false);
  const [currenteDocs, setCurrentDocs] = useState([]);
  const [modalInfo, setModalInfo] = useState({});
  const [ingredientsCopy, setIngredientsCopy] = useState([]);

  const [modalState, setModalState] = useState(false);
  const {
    transactions,
    deleteTransaction,
    updateTransacation,
    updateIngredients,
  } = useContext(CalculationContext);
  const { currentUser } = useContext(AuthContext);

  const amounts = transactions.map((transaction) => transaction.price);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    setCurrentDocs(transactions.slice(indexOfFirstPost, indexOfLastPost));
    if (
      modalInfo &&
      modalInfo.infoModal &&
      modalInfo.ingredientesSelecionados
    ) {
      const copiaIngredientes = modalInfo.infoModal.ingredientes.map(
        (ingrediente) => ({
          ...ingrediente,
          checked: false,
        })
      );

      modalInfo.ingredientesSelecionados.forEach((ingrdienteSelecionado) => {
        copiaIngredientes.forEach((copiaIngrediente) => {
          if (ingrdienteSelecionado.id === copiaIngrediente.id) {
            copiaIngrediente.checked = true;
          }
        });
      });

      setIngredientsCopy(copiaIngredientes);
    }
  }, [transactions, indexOfFirstPost, indexOfLastPost, modalInfo]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLabelCount = (number, id, index) => {
    const docId = transactions.findIndex(
      (transaction) => transaction.id === id
    );
    console.log(transactions);
    const newTransaction = { ...transactions[docId] };
    if (number === 1) {
      newTransaction.labelCount += 1;
      newTransaction.price =
        newTransaction.price + transactions[docId].initialPrice;
      setModalInfo(newTransaction);
    } else if (number === 0) {
      newTransaction.labelCount -= 1;
      setModalInfo(newTransaction);
      if (newTransaction.labelCount < 2) {
        newTransaction.labelCount = 1;
        newTransaction.price = newTransaction.initialPrice;
      } else {
        newTransaction.price =
          newTransaction.price - transactions[docId].initialPrice;
      }
    }

    updateTransacation(newTransaction, index);
  };

  const handleOrders = async () => {
    if (currentUser) {
      await firestore
        .collection('orderinfo')
        .doc(currentUser.uid)
        .set(
          {
            orders: firebase.firestore.FieldValue.arrayUnion({
              id: uuidv4(),
              date: new Date(),
              total,
              transactions,
            }),
          },
          { merge: true }
        );
    }
  };

  const openModal = (transaction) => {
    setModalState(true);
    setModalInfo({ ...transaction });
  };

  const closeModal = () => {
    const ingredients = [];
    ingredientsCopy.forEach((igrd) => {
      if (igrd.checked) {
        ingredients.push(igrd);
      }
    });
    updateIngredients(modalInfo.id, ingredients);
    setModalState(false);
  };

  const handleCancelBtn = (transaction) => {
    deleteTransaction(transaction);
    setpageIndetification(true);
  };

  const removeorAddIngrediente = (ingrediente) => {
    const copy = [...ingredientsCopy];

    copy.forEach((ingredienteCopy) => {
      if (ingredienteCopy.id === ingrediente.id) {
        ingredienteCopy.checked = !ingredienteCopy.checked;
        return;
      }
    });
    setIngredientsCopy(copy);
    console.log(ingredientsCopy);
  };

  const thereIsIngredients = () => {
    return ingredientsCopy.some((ingrediente) => ingrediente.checked);
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn mobile={12} computer={12}>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              {/* <Segment textAlign='center' raised color='black' placeholder> */}
              <Header as='h2' icon textAlign='center'>
                {transactions.length > 0 && (
                  <Fragment>
                    <Icon name='users' circular />
                    <Header.Content>Meu Pedido</Header.Content>
                  </Fragment>
                )}
              </Header>
              <Grid stackable>
                {currenteDocs.map((transaction, index) => (
                  <Fragment key={transaction.id}>
                    <Grid.Column computer={4}>
                      <Segment
                        // style={{ marginTop: '25px' }}
                        size='mini'
                        padded
                        textAlign='center'
                        raised
                      >
                        <Image src={transaction.infoModal.img} />
                        <Divider />
                        <Responsive as={Fragment} {...Responsive.onlyMobile}>
                          <Label size='massive' circular color='red'>
                            {transaction.labelCount}
                          </Label>
                        </Responsive>
                        <h3>Quantidade</h3>
                        <div>
                          <Button
                            onClick={() =>
                              handleLabelCount(0, transaction.id, index)
                            }
                            size='mini'
                            circular
                            icon='minus'
                          ></Button>
                          <Button
                            onClick={() =>
                              handleLabelCount(1, transaction.id, index)
                            }
                            size='mini'
                            circular
                            icon='plus'
                          ></Button>
                        </div>
                      </Segment>
                      <div className='show-label-cart'>
                        <Label size='massive' circular color='red' floating>
                          {transaction.labelCount}
                        </Label>
                      </div>
                    </Grid.Column>
                    <Grid.Column computer={12}>
                      <Segment
                        // style={{ marginTop: '25px' }}
                        textAlign='center'
                        raised
                      >
                        <Header as='h2' icon>
                          {transaction.infoModal.name}{' '}
                          <Header.Subheader>
                            {transaction.infoModal.description}{' '}
                          </Header.Subheader>
                          R${transaction.price.toFixed(2)}
                        </Header>
                        {/* <Responsive as={Fragment} {...Responsive.onlyMobile}>
                          <Label size='massive' circular color='red'>
                            {transaction.labelCount}
                          </Label>
                        </Responsive> */}
                        <Divider horizontal>
                          <Header as='h4'>Opções</Header>
                        </Divider>
                        {transaction.infoModal.tag === 'refrigerante' ||
                          transaction.infoModal.tag === 'agua' ||
                          transaction.infoModal.tag === 'cerveja' ||
                          transaction.infoModal.tag === 'combo' ||
                          transaction.infoModal.tag === 'porções' ||
                          transaction.infoModal.tag === 'condimentos' || (
                            <Modal
                              dimmer={true}
                              trigger={
                                <Button
                                  onClick={() => openModal(transaction)}
                                  color='black'
                                >
                                  Editar Pedido
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
                                {modalInfo.infoModal?.modalHeader}
                              </Segment>
                              <ModalContent image>
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
                                          src={modalInfo.infoModal?.img}
                                        />
                                        <Responsive
                                          {...Responsive.onlyComputer.minWidth}
                                        >
                                          <Label
                                            size='massive'
                                            circular
                                            color='red'
                                            floating
                                          >
                                            {modalInfo.labelCount}
                                          </Label>
                                        </Responsive>

                                        <h3>{modalInfo.infoModal?.name}</h3>

                                        <h3>${modalInfo.price}</h3>
                                        <h3>Quantidade</h3>
                                        <Button
                                          onClick={() =>
                                            handleLabelCount(0, modalInfo.id)
                                          }
                                          size='mini'
                                          circular
                                          icon='minus'
                                        ></Button>
                                        <Button
                                          onClick={() =>
                                            handleLabelCount(1, modalInfo.id)
                                          }
                                          size='mini'
                                          circular
                                          icon='plus'
                                        ></Button>
                                      </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                      <Segment raised padded textAlign='center'>
                                        <h3>Ingredientes</h3>
                                        {!thereIsIngredients() && (
                                          <h1>Sem Ingredientes</h1>
                                        )}
                                        <Grid columns={3}>
                                          {ingredientsCopy.map(
                                            (ingrediente) =>
                                              ingrediente.checked && (
                                                <Grid.Column
                                                  key={ingrediente.id}
                                                >
                                                  <Image
                                                    centered
                                                    size='tiny'
                                                    src={ingrediente.image}
                                                    key={ingrediente.id}
                                                  ></Image>
                                                </Grid.Column>
                                              )
                                          )}
                                        </Grid>
                                      </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                      <Responsive
                                        as={Fragment}
                                        {...Responsive.onlyComputer}
                                      >
                                        {ingredientsCopy.map(
                                          (ingrediente, index) => {
                                            return (
                                              <Checkbox
                                                checked={ingrediente.checked}
                                                key={index}
                                                label={ingrediente.name}
                                                onChange={() =>
                                                  removeorAddIngrediente(
                                                    ingrediente
                                                  )
                                                }
                                              />
                                            );
                                          }
                                        )}
                                      </Responsive>
                                    </Grid.Column>
                                  </Grid.Row>
                                </Grid>
                              </ModalContent>
                            </Modal>
                          )}
                        <Button
                          style={{ marginTop: '10px' }}
                          onClick={() => handleCancelBtn(transaction.id)}
                          color='black'
                        >
                          Cancelar Pedido
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Fragment>
                ))}
              </Grid>
              {transactions.length === 0 && (
                <Fragment>
                  <Container>
                    <div style={{ marginTop: '55px' }}>
                      <Segment>
                        <Header as='div' icon textAlign='center'>
                          <p style={{ fontSize: '1.43em' }}>Está com fome?</p>
                          <Image
                            size='massive'
                            src='https://wtcks.com/images/emptycart.png'
                          />
                        </Header>
                        <h1 style={{ fontSize: '1.83em' }}>
                          Seu pedido está vazio
                        </h1>
                        <p style={{ fontSize: '1.83em' }}>
                          Adicione itens ao seu carrinho
                        </p>
                        <Button as={Link} to='/menu' color='black'>
                          Cardápio
                        </Button>
                      </Segment>
                    </div>
                  </Container>
                </Fragment>
              )}
              <Container>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={transactions.length}
                  paginate={paginate}
                  currenteDocs={currenteDocs}
                  pageIndetification={pageIndetification}
                />
              </Container>
              {transactions.length > 0 && (
                <Fragment>
                  <Divider />
                  <Grid>
                    <GridColumn width={4}></GridColumn>
                    <GridColumn width={8}>
                      <Segment raised textAlign='center'>
                        <Header as='h2'>
                          Valor Total
                          <div style={{ color: 'red' }}>R${total}</div>
                        </Header>
                      </Segment>
                    </GridColumn>
                    <GridColumn width={4}></GridColumn>
                  </Grid>
                  <Button
                    as={Link}
                    to='/orders'
                    onClick={() => handleOrders()}
                    style={{ marginTop: '15px' }}
                    color='green'
                  >
                    <Icon name='checkmark' /> Finalizar Pedido
                  </Button>
                </Fragment>
              )}
              {/* </Segment> */}
            </div>
          </GridColumn>
          <GridColumn width={2}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
