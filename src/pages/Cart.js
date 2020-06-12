import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import CalculationContext from '../context/calculation/calculationContext';

const Cart = () => {
  const { transactions, deleteTransaction } = useContext(CalculationContext);

  const amounts = transactions.map((transaction) => transaction.productPrice);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn mobile={16} computer={10}>
            <Segment
              textAlign='center'
              raised
              color='black'
              style={{ marginTop: '150px' }}
              placeholder
            >
              <Header as='h2' icon textAlign='center'>
                {transactions.length > 0 && (
                  <Fragment>
                    <Icon name='users' circular />
                    <Header.Content>Meu Pedido</Header.Content>
                  </Fragment>
                )}
              </Header>
              <Grid>
                {transactions.map((transaction) => (
                  <Fragment key={transaction.id}>
                    <Grid.Column width={4}>
                      <Segment raised>
                        <Image src={transaction.infoModal.img} />
                        <Divider />
                        <Button
                          onClick={() => deleteTransaction(transaction.id)}
                          circular
                          icon='trash alternate outline'
                        ></Button>
                      </Segment>
                      <Label size='massive' circular color='red' floating>
                        {transaction.labelCount}
                      </Label>
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Segment textAlign='center' raised>
                        <Header as='h2' icon>
                          {transaction.infoModal.name}{' '}
                          <Header.Subheader>
                            {transaction.infoModal.description}{' '}
                          </Header.Subheader>
                          R${transaction.productPrice.toFixed(2)}
                        </Header>
                        <Button color='black'>Editar</Button>{' '}
                      </Segment>
                    </Grid.Column>
                  </Fragment>
                ))}
              </Grid>
              {transactions.length === 0 && (
                <Fragment>
                  <Container>
                    <Header as='div' icon textAlign='center'>
                      <p style={{ fontSize: '1.43em' }}>Está com fome?</p>
                      <Image
                        size='massive'
                        src='https://wtcks.com/images/emptycart.png'
                      />
                    </Header>
                    <h1 style={{ fontSize: '1.83em' }}>
                      Seu pedido está vazio
                    </h1>
                    <p style={{ fontSize: '1.83em' }}>
                      Adicione itens ao seu pedido
                    </p>
                    <Button color='black'>Cardápio</Button>
                  </Container>
                </Fragment>
              )}
              {transactions.length > 0 && (
                <Fragment>
                  <Divider />
                  <Grid>
                    <GridColumn width={4}></GridColumn>
                    <GridColumn width={8}>
                      <Segment raised textAlign='center'>
                        <Header as='h2'>
                          Valor Total
                          <div style={{ color: 'red' }}>R${total}</div>
                        </Header>
                      </Segment>
                    </GridColumn>
                    <GridColumn width={4}></GridColumn>
                  </Grid>
                  <Button style={{ marginTop: '15px' }} color='green'>
                    <Icon name='checkmark' /> Finalizar Pedido
                  </Button>
                </Fragment>
              )}
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
