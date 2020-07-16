import React, { Fragment, useEffect, useState, useContext } from 'react';
import {
  Segment,
  Container,
  Grid,
  GridColumn,
  Header,
  Image,
  Divider,
  Icon,
  Form,
  Button,
  Modal,
  Step,
  Label,
} from 'semantic-ui-react';
import AuthContext from '../../context/authentication/authContext';
import Pagination from '../../components/layout/Pagination';
import { firestore } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
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

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const returnDocument = async () => {
        await firestore
          .collection('orderinfo')
          .doc(currentUser.uid)
          .onSnapshot((snapshot) => {
            setOrderInfo([...snapshot.data()['orders']]);
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
    setOrderDetails(order);
    if (orderDetails) {
      history.push('/ordersdetails');
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
                marginTop: '70px',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <h1>Seus Pedidos</h1>
              {currenteDocs.map((order) => (
                <GridColumn key={order.id} width={11}>
                  <Segment raised>
                    <Grid stackable columns={3}>
                      <GridColumn width={8}>
                        <Header as='h2'>
                          <Image
                            circular
                            src='https://support.ezlynx.com/support/wp-content/uploads/2018/10/02182034/checkmark.png'
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
