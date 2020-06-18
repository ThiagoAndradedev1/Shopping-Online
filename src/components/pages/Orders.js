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

const Orders = () => {
  return (
    <Fragment className='body'>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn width={10}>
            <Segment
              raised
              textAlign='center'
              style={{ marginTop: '120px', padding: '40px' }}
            >
              <Header as='h2'>
                <Image src='https://image.flaticon.com/icons/png/512/34/34627.png' />{' '}
                Seus Pedidos
              </Header>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>03/04/2020</Header>
              </Divider>
              <Container>
                {/* <Step.Group>
                  <Step>
                    <Icon name='truck' />
                    <Step.Content>
                      <Step.Title>Shipping</Step.Title>
                      <Step.Description>
                        Choose your shipping options
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step active>
                    <Icon name='payment' />
                    <Step.Content>
                      <Step.Title>Billing</Step.Title>
                      <Step.Description>
                        Enter billing information
                      </Step.Description>
                    </Step.Content>
                  </Step>

                  <Step disabled>
                    <Icon name='info' />
                    <Step.Content>
                      <Step.Title>Confirm Order</Step.Title>
                    </Step.Content>
                  </Step>
                </Step.Group> */}
              </Container>
              <Divider style={{ marginTop: '30px' }} horizontal>
                <Header as='h4'>05/07/2020</Header>
              </Divider>
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Orders;
