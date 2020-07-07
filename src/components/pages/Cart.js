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
  const [initialPrice, setInitialPrice] = useState(0);

  const [modalState, setModalState] = useState(false);
  const { transactions, deleteTransaction, updateTransacation } = useContext(
    CalculationContext
  );
  const { currentUser } = useContext(AuthContext);

  const amounts = transactions.map((transaction) => transaction.productPrice);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    setCurrentDocs(transactions.slice(indexOfFirstPost, indexOfLastPost));
  }, [transactions, indexOfFirstPost, indexOfLastPost]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLabelCount = (number, index, productPrice) => {
    const newTransaction = { ...transactions[index] };
    if (number === 1) {
      newTransaction.labelCount += 1;
      newTransaction.productPrice =
        newTransaction.productPrice + transactions[index].initialPrice;
    } else if (number === 0) {
      newTransaction.labelCount -= 1;
      if (newTransaction.labelCount < 2) {
        console.log(newTransaction.initialPrice);
        newTransaction.labelCount = 1;
        newTransaction.productPrice = newTransaction.initialPrice;
      } else {
        newTransaction.productPrice =
          newTransaction.productPrice - transactions[index].initialPrice;
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

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const handleCancelBtn = (transaction) => {
    deleteTransaction(transaction);
    setpageIndetification(true);
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn mobile={16} computer={12}>
            <div style={{ marginTop: '120px' }}>
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
                              onClick={() => handleLabelCount(0, index)}
                              size='mini'
                              circular
                              icon='minus'
                            ></Button>
                            <Button
                              onClick={() =>
                                handleLabelCount(
                                  1,
                                  index
                                  // transaction.productPrice
                                )
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
                            R${transaction.productPrice.toFixed(2)}
                          </Header>
                          <Divider horizontal>
                            <Header as='h4'>Opções</Header>
                          </Divider>
                          {transaction.infoModal.tag === 'refrigerante' ||
                            transaction.infoModal.tag === 'agua' ||
                            transaction.infoModal.tag === 'cerveja' || (
                              <Modal
                                trigger={
                                  <Button
                                    onClick={() => openModal()}
                                    color='black'
                                  >
                                    Editar Pedido
                                  </Button>
                                }
                                open={modalState}
                                onClose={() => closeModal()}
                              >
                                <Segment>
                                  <h1>ola</h1>
                                </Segment>
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
