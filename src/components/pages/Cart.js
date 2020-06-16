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
import Pagination from '../layout/Pagination';
import CalculationContext from '../../context/calculation/calculationContext';

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const { transactions, deleteTransaction } = useContext(CalculationContext);

  const amounts = transactions.map((transaction) => transaction.productPrice);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentDocs = transactions.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLabelCount = (number, id) => {
    const resultado = transactions.findIndex(
      (transaction) => transaction.id === id
    );
    if (resultado !== -1 && number === 1) {
      transactions[resultado].labelCount = transactions[
        resultado
      ].labelCount += 1;
    } else if (resultado !== -1 && number === 0) {
      let minusResult = (transactions[resultado].labelCount = transactions[
        resultado
      ].labelCount -= 1);
      if (minusResult < 1) {
        minusResult = 1;
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={2}></GridColumn>
          <GridColumn mobile={16} computer={12}>
            <Segment
              textAlign='center'
              raised
              color='black'
              style={{ marginTop: '110px' }}
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
                {currentDocs.map((transaction) => (
                  <Fragment key={transaction.id}>
                    <Grid.Column width={4}>
                      <Segment textAlign='center' raised>
                        <Image src={transaction.infoModal.img} />
                        <Divider />
                        <h3>Quantidade</h3>
                        <div>
                          <Button
                            onClick={() => handleLabelCount(0, transaction.id)}
                            size='mini'
                            circular
                            icon='minus'
                          ></Button>
                          <Button
                            onClick={() => handleLabelCount(1, transaction.id)}
                            size='mini'
                            circular
                            icon='plus'
                          ></Button>
                        </div>
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
                        <Divider horizontal>
                          <Header as='h4'>
                            {/* <Icon name='tag' /> */}
                            Opções
                          </Header>
                        </Divider>
                        {transaction.infoModal.tag === 'refrigerante' ||
                          transaction.infoModal.tag === 'agua' ||
                          transaction.infoModal.tag === 'cerveja' || (
                            <Button color='black'>Editar Pedido</Button>
                          )}
                        <Button
                          style={{ marginTop: '10px' }}
                          onClick={() => deleteTransaction(transaction.id)}
                          color='black'
                        >
                          Cancelar Pedido
                        </Button>
                      </Segment>
                    </Grid.Column>
                    {/* <Modal key={transaction.id} transaction={transaction} /> */}
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
              <Container>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={transactions.length}
                  paginate={paginate}
                />
              </Container>
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
          <GridColumn width={2}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
