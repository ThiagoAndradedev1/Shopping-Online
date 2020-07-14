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
            <GridColumn width={10}>
              <div className='order-style'>
                <Segment>
                  <Step.Group ordered>
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
                  </Step.Group>
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
                              Hambúrger
                            </Header>
                          </GridColumn>
                          <GridColumn width={6}></GridColumn>
                          <GridColumn width={4}>
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
