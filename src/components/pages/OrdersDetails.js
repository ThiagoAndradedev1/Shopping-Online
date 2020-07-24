import React, { Fragment, useContext, useEffect } from 'react';
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
  Input,
} from 'semantic-ui-react';
import AuthContext from '../../context/authentication/authContext';
import { useParams } from 'react-router-dom';
import { firestore, firebase } from '../../firebase';
import { useState } from 'react';

const OrdersDetails = () => {
  const { orderDetails, setOrderDetails, currentUser } = useContext(
    AuthContext
  );

  let { id } = useParams();

  const [listaPedidos, setListPedidos] = useState([]);

  const retornaPedidoAtual = () => {
    return listaPedidos.find((pedido) => pedido.id === id);
  };

  useEffect(() => {
    if (
      Object.keys(orderDetails).length === 0 &&
      orderDetails.constructor === Object
    ) {
      console.log('caiu aqui');
      const getOrderInfoById = async () => {
        await firestore
          .collection('orderinfo')
          .doc(currentUser.uid)
          .get()
          .then((snapshot) => {
            setListPedidos(snapshot.data().orders);
          });
      };
      getOrderInfoById();
    }
  }, [orderDetails, currentUser]);

  useEffect(() => {}, []);

  return (
    <Fragment>
      {orderDetails && orderDetails.transactions && (
        <Container>
          <Grid columns={3}>
            <GridColumn width={3}></GridColumn>
            <GridColumn mobile={16} computer={10}>
              <div className='order-style'>
                <div className='flex-step'>
                  <div className='flex-item-step done'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          className='check huge icon'
                          style={{ fontSize: '2.5em', color: '#1fb332' }}
                        ></i>
                      </div>
                      <div>
                        <h1>1 Passo</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex-item-step todo'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          class='check huge icon'
                          style={{ fontSize: '2.5em', color: '#6bb16' }}
                        ></i>
                      </div>
                      <div>
                        <h1>2 Passo</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex-item-step todo'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          className='check huge icon'
                          style={{ fontSize: '2.5em', color: '#6bb16' }}
                        ></i>
                      </div>
                      <div>
                        <h1>3 Passo</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <Segment>
                  <Divider horizontal>
                    <Header as='h4'>
                      <Icon name='money bill alternate outline' />
                      Seu Pedido
                    </Header>
                  </Divider>
                  {orderDetails.transactions.length > 0 &&
                    orderDetails.transactions.map((order) => (
                      <Segment key={order.id} raised>
                        <Grid columns={3}>
                          <GridColumn width={6}>
                            <Header as='h2'>
                              <Image size='massive' src={order.infoModal.img} />{' '}
                              {order.infoModal?.name}
                            </Header>
                          </GridColumn>
                          <GridColumn width={4}></GridColumn>
                          <GridColumn width={6}>
                            <h2>{order.price?.toFixed(2)}</h2>
                            <input
                              disabled
                              type='text'
                              className='order-input'
                              value={order.labelCount}
                              size='1'
                            ></input>
                          </GridColumn>
                        </Grid>
                      </Segment>
                    ))}
                  <Divider style={{ marginTop: '30px' }} />
                  <Grid>
                    <GridColumn width={4}></GridColumn>
                    <GridColumn width={8}>
                      <Segment raised textAlign='center'>
                        <Header as='h2'>
                          Valor Total
                          <div style={{ color: 'red' }}>
                            {orderDetails.total}
                          </div>
                        </Header>
                      </Segment>
                    </GridColumn>
                    <GridColumn width={4}></GridColumn>
                  </Grid>
                  {/* <Header as='h2'>
                    Valor Total
                    <div style={{ color: 'red' }}>{orderDetails.total}</div>
                  </Header> */}
                </Segment>
              </div>
            </GridColumn>
            <GridColumn width={3}></GridColumn>
          </Grid>
        </Container>
      )}

      {!orderDetails && <h1>Não há pedidos</h1>}

      {listaPedidos.length > 0 && (
        <Container>
          <Grid columns={3}>
            <GridColumn width={3}></GridColumn>
            <GridColumn mobile={16} computer={10}>
              <div className='order-style'>
                <div className='flex-step'>
                  <div className='flex-item-step done'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          className='check huge icon'
                          style={{ fontSize: '2.5em', color: '#1fb332' }}
                        ></i>
                      </div>
                      <div>
                        <h1>1 Passo</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex-item-step todo'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          className='check huge icon'
                          style={{ fontSize: '2.5em', color: '#6bb16' }}
                        ></i>
                      </div>
                      <div>
                        <h1>2 Passo</h1>
                      </div>
                    </div>
                  </div>
                  <div className='flex-item-step todo'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <div>
                        <i
                          aria-hidden='true'
                          className='check huge icon'
                          style={{ fontSize: '2.5em', color: '#6bb16' }}
                        ></i>
                      </div>
                      <div>
                        <h1>3 Passo</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <Segment>
                  <Divider horizontal>
                    <Header as='h4'>
                      <Icon name='money bill alternate outline' />
                      Seu Pedido
                    </Header>
                  </Divider>
                  {retornaPedidoAtual().transactions.length > 0 &&
                    retornaPedidoAtual().transactions.map((order) => (
                      <Segment key={order.id} raised>
                        <Grid columns={3}>
                          <GridColumn width={6}>
                            <Header as='h2'>
                              <Image size='massive' src={order.infoModal.img} />{' '}
                              {order.infoModal?.name}
                            </Header>
                          </GridColumn>
                          <GridColumn width={4}></GridColumn>
                          <GridColumn width={6}>
                            <h2>{order.price?.toFixed(2)}</h2>
                            <input
                              disabled
                              type='text'
                              className='order-input'
                              value={order.labelCount}
                              size='1'
                            ></input>
                          </GridColumn>
                        </Grid>
                      </Segment>
                    ))}
                  <Divider style={{ marginTop: '30px' }} />
                  <Grid>
                    <GridColumn width={4}></GridColumn>
                    <GridColumn width={8}>
                      <Segment raised textAlign='center'>
                        <Header as='h2'>
                          Valor Total
                          <div style={{ color: 'red' }}>
                            {retornaPedidoAtual().total}
                          </div>
                        </Header>
                      </Segment>
                    </GridColumn>
                    <GridColumn width={4}></GridColumn>
                  </Grid>
                </Segment>
              </div>
            </GridColumn>
            <GridColumn width={3}></GridColumn>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

export default OrdersDetails;
