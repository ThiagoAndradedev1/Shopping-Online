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
  GridRow,
  Responsive,
  Checkbox,
} from 'semantic-ui-react';
import { firestore, firebase } from '../../firebase';
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
  const { transactions, deleteTransaction, updateTransacation } = useContext(
    CalculationContext
  );
  const { currentUser } = useContext(AuthContext);

  const amounts = transactions.map((transaction) => transaction.price);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    // console.log(0)
    setCurrentDocs(transactions.slice(indexOfFirstPost, indexOfLastPost));
    if (modalInfo && modalInfo.infoModal) {
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

  const handleLabelCount = (number, id) => {
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

    updateTransacation(newTransaction);
  };

  const handleOrders = async () => {
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
  };

  const openModal = (transaction) => {
    setModalState(true);
    setModalInfo({ ...transaction });
  };

  const closeModal = () => {
    setModalState(false);
  };

  const handleCancelBtn = (transaction) => {
    deleteTransaction(transaction);
    setpageIndetification(true);
  };

  const removeorAddIngrediente = (ingrediente) => {
    console.log(ingrediente);
    const retorno = ingredientsCopy.findIndex(
      (ingredienteCopy) => ingredienteCopy.id === ingrediente.id
    );
    const copy = [...ingredientsCopy];
    if (retorno !== -1) {
      console.log(copy);
      copy[retorno].checked = false;
      setIngredientsCopy(copy);
    } else {
      console.log('caiu aqui');
      copy[retorno].checked = true;
      setIngredientsCopy(copy);
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn mobile={16} computer={12}>
            <div style={{ marginTop: '50px' }}>
              <Segment textAlign='center' raised color='black' placeholder>
                <Header as='h2' icon textAlign='center'>
                  {transactions.length > 0 && (
                    <Fragment>
                      <Icon name='users' circular />
                      <Header.Content>Meu Pedido</Header.Content>
                    </Fragment>
                  )}
                </Header>
                <Grid>
                  {currenteDocs.map((transaction, index) => (
                    <Fragment key={transaction.id}>
                      <Grid.Column width={4}>
                        <Segment size='mini' padded textAlign='center' raised>
                          <Image src={transaction.infoModal.img} />
                          <Divider />
                          <h3>Quantidade</h3>
                          <div>
                            <Button
                              onClick={() =>
                                handleLabelCount(0, transaction.id)
                              }
                              size='mini'
                              circular
                              icon='minus'
                            ></Button>
                            <Button
                              onClick={() =>
                                handleLabelCount(1, transaction.id)
                              }
                              size='mini'
                              circular
                              icon='plus'
                            ></Button>
                          </div>
                        </Segment>
                        <Label size='massive' circular color='red' floating>
                          {transaction.labelCount}
                        </Label>
                      </Grid.Column>
                      <Grid.Column width={12}>
                        <Segment textAlign='center' raised>
                          <Header as='h2' icon>
                            {transaction.infoModal.name}{' '}
                            <Header.Subheader>
                              {transaction.infoModal.description}{' '}
                            </Header.Subheader>
                            R${transaction.price.toFixed(2)}
                          </Header>
                          <Divider horizontal>
                            <Header as='h4'>Opções</Header>
                          </Divider>
                          {transaction.infoModal.tag === 'refrigerante' ||
                            transaction.infoModal.tag === 'agua' ||
                            transaction.infoModal.tag === 'cerveja' ||
                            transaction.infoModal.tag === 'combo' || (
                              <Modal
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
                                  Pizza
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
                                          <Label
                                            size='massive'
                                            circular
                                            color='red'
                                            floating
                                          >
                                            {modalInfo.labelCount}
                                          </Label>

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
                                        <Segment
                                          raised
                                          padded
                                          textAlign='center'
                                        >
                                          <h3>Ingredientes</h3>

                                          {modalInfo.ingredientesSelecionados
                                            ?.length === 0 && (
                                            <h1>Sem Ingredientes</h1>
                                          )}
                                          <Grid columns={3}>
                                            {modalInfo.ingredientesSelecionados?.map(
                                              (x) => {
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
                                              }
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
                        Adicione itens ao seu pedido
                      </p>
                      <Button color='black'>Cardápio</Button>
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
                      onClick={() => handleOrders()}
                      style={{ marginTop: '15px' }}
                      color='green'
                    >
                      <Icon name='checkmark' /> Finalizar Pedido
                    </Button>
                  </Fragment>
                )}
              </Segment>
            </div>
          </GridColumn>
          <GridColumn width={2}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
