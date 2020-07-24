import React, { Fragment, useEffect, useState, useContext } from 'react';
import {
  Segment,
  Container,
  Grid,
  GridColumn,
  Header,
  Image,
  Button,
} from 'semantic-ui-react';
import AuthContext from '../../context/authentication/authContext';
import Pagination from '../../components/layout/Pagination';
import { firestore } from '../../firebase';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const Orders = () => {
  const { currentUser, setOrderDetails, orderDetails } = useContext(
    AuthContext
  );
  const [orderInfo, setOrderInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [pageIndetification] = useState(false);
  const [currenteDocs, setCurrentDocs] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setShowSpinner(true);
    if (currentUser) {
      const returnDocument = async () => {
        await firestore
          .collection('orderinfo')
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            if (snapshot.data()) {
              console.log(snapshot);
              setOrderInfo([...snapshot.data()['orders']]);
            }
            setShowSpinner(false);
          });
      };
      returnDocument();
    }
  }, [currentUser]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  useEffect(() => {
    setCurrentDocs(orderInfo.slice(indexOfFirstPost, indexOfLastPost));
  }, [orderInfo, indexOfFirstPost, indexOfLastPost]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setOrder = (order) => {
    console.log(order);
    setOrderDetails(order);
    if (orderDetails) {
      history.push(`/ordersdetails/${order.id}`);
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn mobile={16} computer={12}>
            <div
              style={{
                marginTop: '-10px',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <h1>Seus Pedidos</h1>
              {orderInfo.length > 0 &&
                currenteDocs.map((order) => (
                  <GridColumn key={order.id} width={11}>
                    <Segment style={{ marginTop: '25px' }} raised>
                      <Grid stackable columns={3}>
                        <GridColumn width={8}>
                          <Header as='h2'>
                            <Image
                              circular
                              src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fcheck_mark.png?alt=media&token=fe970737-35e7-4220-80b8-3545b34d8d69'
                            />{' '}
                            Lanchonete Online
                          </Header>
                          <p>{moment(order.date.toDate()).format('LLL')}</p>
                        </GridColumn>
                        <GridColumn width={4}></GridColumn>
                        <GridColumn width={4}>
                          <h2>{order.total}</h2>
                          <Button onClick={() => setOrder(order)} color='black'>
                            Ver Detalhes
                          </Button>
                        </GridColumn>
                      </Grid>
                    </Segment>
                  </GridColumn>
                ))}

              {showSpinner && <h1>Carregando...</h1>}

              {currenteDocs.length === 0 && !showSpinner && (
                <div style={{ textAlign: 'center' }}>
                  <h1>Nenhuma compra foi realizada até o momento...</h1>
                </div>
              )}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={orderInfo.length}
                paginate={paginate}
                currenteDocs={currenteDocs}
                pageIndetification={pageIndetification}
              />
            </div>
          </GridColumn>
          <GridColumn width={2}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Orders;
