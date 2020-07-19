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

const OrdersDetails = () => {
  const { orderDetails } = useContext(AuthContext);

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

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
                          class='check huge icon'
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
                          class='check huge icon'
                          style={{ fontSize: '2.5em', color: '#6bb16' }}
                        ></i>
                      </div>
                      <div>
                        <h1>3 Passo</h1>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Step.Group ordered>
                  <Step completed>
                    <Step.Content>
                      <Step.Title>Shipping</Step.Title>
                      <Step.Description>
                        Choose your shipping options
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step completed>
                    <Step.Content>
                      <Step.Title>Billing</Step.Title>
                      <Step.Description>
                        Enter billing information
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step active>
                    <Step.Content>
                      <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                  </Step>
                </Step.Group> */}
                <Segment>
                  {/* <Step.Group ordered>
                    <Step completed>
                      <Step.Content>
                        <Step.Title>Shipping</Step.Title>
                        <Step.Description>
                          Choose your shipping options
                        </Step.Description>
                      </Step.Content>
                    </Step>

                    <Step completed>
                      <Step.Content>
                        <Step.Title>Billing</Step.Title>
                        <Step.Description>
                          Enter billing information
                        </Step.Description>
                      </Step.Content>
                    </Step>

                    <Step active>
                      <Step.Content>
                        <Step.Title>Confirm Order</Step.Title>
                      </Step.Content>
                    </Step>
                  </Step.Group> */}
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
                  <Header as='h2'>
                    Valor Total
                    <div style={{ color: 'red' }}>{orderDetails.total}</div>
                  </Header>
                </Segment>
              </div>
            </GridColumn>
            <GridColumn width={3}></GridColumn>
          </Grid>
        </Container>
      )}

      {!orderDetails && <h1>Não há pedidos</h1>}
    </Fragment>
  );
};

export default OrdersDetails;
