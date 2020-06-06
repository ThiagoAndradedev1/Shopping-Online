import React, { Fragment } from 'react';
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
  Input,
} from 'semantic-ui-react';

const Cart = () => {
  return (
    <Fragment>
      <Container>
        <Grid columns={3}>
          <GridColumn width={3}></GridColumn>
          <GridColumn mobile={16} computer={10}>
            <Segment color='black' style={{ marginTop: '150px' }} placeholder>
              <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Meu Pedido</Header.Content>
              </Header>
              <Divider />
              <Grid>
                <Grid.Column width={4}>
                  <Image src='https://i.dlpng.com/static/png/33596_preview.png' />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header as='h2' icon>
                    HAMBÚRGUER
                    <Header.Subheader>Cheese Burger</Header.Subheader>
                    R$ 26,50
                  </Header>
                  <Button secondary floated='right'>
                    Editar
                  </Button>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Image src='https://i.dlpng.com/static/png/33596_preview.png' />
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header as='h2' icon>
                    HAMBÚRGUER
                    <Header.Subheader>Cheese Burger</Header.Subheader>
                    R$ 26,50
                  </Header>
                  <Button secondary floated='right'>
                    Editar
                  </Button>
                </Grid.Column>
              </Grid>
            </Segment>
          </GridColumn>
          <GridColumn width={3}></GridColumn>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Cart;
