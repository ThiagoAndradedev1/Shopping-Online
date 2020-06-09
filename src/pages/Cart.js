import React, { Fragment, useContext } from 'react';
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
} from 'semantic-ui-react';
import CalculationContext from '../context/calculationContext';

const Cart = () => {
  const { transactions } = useContext(CalculationContext);

  const amounts = transactions.map((transaction) => transaction.productPrice);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn mobile={16} computer={10}>
            <Segment
              raised
              color='black'
              style={{ marginTop: '150px' }}
              placeholder
            >
              <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Meu Pedido</Header.Content>
              </Header>
              <Grid>
                {transactions.map((transaction) => (
                  <Fragment>
                    <Grid.Column key={transaction.id} width={4}>
                      <Segment raised>
                        <Image src={transaction.infoModal.img} />
                      </Segment>
                      <Label size='massive' circular color='red' floating>
                        {transaction.labelCount}
                      </Label>
                    </Grid.Column>

                    <Grid.Column key={transaction.id} width={12}>
                      <Segment textAlign='center' raised>
                        <Header as='h2' icon>
                          {transaction.infoModal.name}
                          <Header.Subheader>
                            {transaction.infoModal.description}
                          </Header.Subheader>
                          ${transaction.productPrice}
                        </Header>
                        <Button color='black'>Editar</Button>
                        {/* <Button secondary floated='right'>
                          Editar
                        </Button> */}
                      </Segment>
                    </Grid.Column>
                  </Fragment>
                ))}
              </Grid>
              <Divider />
              <Grid>
                <GridColumn width={4}></GridColumn>
                <GridColumn width={8}>
                  <Segment textAlign='center'>
                    <Header as='h2'>
                      Valor Total
                      <div style={{ color: 'red' }}>${total}</div>
                    </Header>
                  </Segment>
                </GridColumn>
                <GridColumn width={4}></GridColumn>
              </Grid>
              <Button style={{ marginTop: '15px' }} color='green'>
                <Icon name='checkmark' /> Finalizar Pedido
              </Button>
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
