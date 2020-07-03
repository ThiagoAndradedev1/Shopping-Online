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
} from 'semantic-ui-react';
import AuthContext from '../../context/authentication/authContext';
import { firestore } from '../../firebase';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Orders = () => {
  const { currentUser, setOrderDetails } = useContext(AuthContext);
  const [orderInfo, setOrderInfo] = useState([]);

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

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn width={12}>
            <div
              style={{
                marginTop: '70px',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <h1>Seus Pedidos</h1>
              {orderInfo.map((order) => (
                // <GridColumn key={order.id} width={11}>
                <Segment raised>
                  <Grid columns={3}>
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
                      <Button
                        as={Link}
                        to='/ordersdetails'
                        onClick={() => setOrderDetails(order)}
                        color='black'
                      >
                        Ver Detalhes
                      </Button>
                    </GridColumn>
                  </Grid>
                </Segment>
                // </GridColumn>
              ))}
            </div>
          </GridColumn>
          <GridColumn width={2}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Orders;
