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
import { Link } from 'react-router-dom';

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
              style={{ marginTop: '140px', padding: '40px' }}
            >
              <Grid columns={3}>
                <GridColumn width={8}>
                  <Header as='h2'>
                    <Image
                      circular
                      src='https://support.ezlynx.com/support/wp-content/uploads/2018/10/02182034/checkmark.png'
                    />{' '}
                    Lanchonete Online
                  </Header>
                  <p>26/06/2020</p>
                </GridColumn>
                <GridColumn width={4}></GridColumn>
                <GridColumn width={4}>
                  <h2>R$ 54,67</h2>
                </GridColumn>
              </Grid>
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Orders;
