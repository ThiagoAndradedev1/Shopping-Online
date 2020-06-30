import React, { Fragment } from 'react';
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

const OrdersDetails = () => {
  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn width={10}>
            <div className='order-style'>
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
              <Segment raised>
                <Grid columns={3}>
                  <GridColumn width={6}>
                    <Header as='h2'>
                      <Image
                        size='massive'
                        src='https://vejario.abril.com.br/wp-content/uploads/2017/11/mc-donalds.png'
                      />{' '}
                      Hambúrger
                    </Header>
                  </GridColumn>
                  <GridColumn width={6}></GridColumn>
                  <GridColumn width={4}>
                    <h2>R$ 54,67</h2>
                    <input
                      disabled
                      type='text'
                      className='order-input'
                      value={'1'}
                      size='1'
                    ></input>
                  </GridColumn>
                </Grid>
              </Segment>
              <Segment raised>
                <Grid columns={3}>
                  <GridColumn width={6}>
                    <Header as='h2'>
                      <Image
                        size='massive'
                        src='https://vejario.abril.com.br/wp-content/uploads/2017/11/mc-donalds.png'
                      />{' '}
                      Hambúrger
                    </Header>
                  </GridColumn>
                  <GridColumn width={6}></GridColumn>
                  <GridColumn width={4}>
                    <h2>R$ 54,67</h2>
                    <input
                      disabled
                      type='text'
                      className='order-input'
                      value={'3'}
                      size='1'
                    ></input>
                  </GridColumn>
                </Grid>
              </Segment>
              <Segment raised>
                <Grid columns={3}>
                  <GridColumn width={6}>
                    <Header as='h2'>
                      <Image
                        size='massive'
                        src='https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png'
                      />{' '}
                      Hambúrger
                    </Header>
                  </GridColumn>
                  <GridColumn width={6}></GridColumn>
                  <GridColumn width={4}>
                    <h2>R$ 54,67</h2>
                    <input
                      disabled
                      type='text'
                      className='order-input'
                      value={'5'}
                      size='1'
                    ></input>
                  </GridColumn>
                </Grid>
              </Segment>
              <Segment raised>
                <Grid columns={3}>
                  <GridColumn width={6}>
                    <Header as='h2'>
                      <Image
                        size='massive'
                        src='https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png'
                      />{' '}
                      Hambúrger
                    </Header>
                  </GridColumn>
                  <GridColumn width={6}></GridColumn>
                  <GridColumn width={4}>
                    <h2>R$ 54,67</h2>
                    <input
                      disabled
                      type='text'
                      className='order-input'
                      value={'5'}
                      size='1'
                    ></input>
                  </GridColumn>
                </Grid>
              </Segment>
              <Divider style={{ marginTop: '30px' }} />
              <Header as='h2'>
                Valor Total
                <div style={{ color: 'red' }}>R$ 25.50</div>
              </Header>
            </div>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default OrdersDetails;
