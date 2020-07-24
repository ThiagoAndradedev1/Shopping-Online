import React, { Fragment, useEffect, useState, useContext } from 'react';
import { firestore } from '../../firebase';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import calculationContext from '../../context/calculation/calculationContext';
import {
  Container,
  Grid,
  List,
  Image,
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const welcomeSlider = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const settingsQuotes = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const bestSellerSlider = {
  dots: false,
  infinite: true,
  speed: 2200,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [infoFilter, setInfoFilter] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [labelCount] = useState(1);
  const { addTransaction, transactions, updateTransacation } = useContext(
    calculationContext
  );

  useEffect(() => {
    getMenuInfo();
    getBestSeller();
  }, []);

  const getMenuInfo = () => {
    firestore
      .collection('menuinfo')
      .orderBy('tag')
      .onSnapshot((snapshot) => {
        const newInformation = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = newInformation.filter((info) => {
          return info.tag.match('combo');
        });
        setInfoFilter(filtered);
      });
  };

  const getBestSeller = () => {
    firestore
      .collection('bestseller')
      .orderBy('tag')
      .onSnapshot((snapshot) => {
        const newInformation = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBestSeller(newInformation);
        console.log(newInformation);
      });
  };

  const notify = () => {
    toast.success('🛒 Produto adicionado ao carrinho...');
  };

  const buyProduct = async (infoItem, price, labelCount) => {
    notify();

    const resultado = transactions.findIndex(
      (transaction) => transaction.infoModal.name === infoItem.name
    );
    if (resultado !== -1) {
      const upTransaction = { ...transactions[resultado] };

      upTransaction.labelCount = labelCount += upTransaction.labelCount;
      upTransaction.price = upTransaction.price += Number(price);

      updateTransacation(upTransaction, resultado);
    } else {
      const newTransaction = {
        id: uuidv4(),
        labelCount,
        price: price * labelCount,
        infoModal: infoItem,
        initialPrice: Number(price),
        ingredientesSelecionados: infoItem.ingredientes,
      };

      addTransaction(newTransaction);
    }
  };

  return (
    <Fragment>
      <div>
        <div
          className='welcome-img'
          style={{
            minHeight: '700px',
            textAlign: 'center',
          }}
        >
          <Container text>
            <Slider {...welcomeSlider}>
              <div>
                <Header
                  inverted
                  content='Hamburgeria Online'
                  style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: '0px',
                    marginTop: '3em',
                  }}
                />
                <Header
                  as='h2'
                  inverted
                  content='Cheque o nosso cardápio e tenha acesso a várias delicias.'
                  style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                  }}
                />
                <Button as={Link} to='/menu' color='black' size='huge'>
                  Cardápio
                </Button>
              </div>
            </Slider>
          </Container>
        </div>
      </div>
      <Container style={{ marginTop: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.93em' }}>Mais Vendidos</h1>
          <p style={{ fontSize: '1.73em' }}>
            Veja os produtos mais queridos do nosso Cárdapio.
          </p>

          <Slider {...bestSellerSlider}>
            {bestSeller.map((info, index) => {
              return (
                <div key={index}>
                  <div className='card'>
                    <Image
                      circular
                      size='big'
                      style={{ minHeight: '250px', maxWidth: '250px' }}
                      src={info.img}
                    />{' '}
                    <Header textAlign='center' as='h2' icon>
                      {info.name}
                      <Header.Subheader>{info.description}</Header.Subheader>

                      <span>{info.price}</span>
                    </Header>
                    <Button
                      onClick={() => buyProduct(info, info.price, labelCount)}
                      color='black'
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </Container>
      <div
        className='combos-background-img'
        style={{
          minHeight: '350px',
          textAlign: 'center',
        }}
      >
        <Container text>
          <Header
            inverted
            content='Nossos Combos'
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginTop: '50px',
            }}
          />
          <Header
            as='h2'
            inverted
            content='Cheque os nosso combos e ganhe descontos nos preços.'
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '1.5em',
            }}
          />
          <Grid only='computer' columns={3} className='show-combo-large'>
            {infoFilter.map((info, index) => {
              return (
                <Grid.Column key={index}>
                  <Image
                    style={{ minHeight: '200px', maxWidth: '200px' }}
                    size='big'
                    src={info.img}
                  />{' '}
                  <Header inverted textAlign='center' as='h2' icon>
                    {info.name}
                    <Header.Subheader> {info.description}</Header.Subheader>
                    <span>{info.price}</span>
                  </Header>
                  <Button
                    onClick={() => buyProduct(info, info.price, labelCount)}
                    color='black'
                  >
                    Comprar
                  </Button>
                </Grid.Column>
              );
            })}
          </Grid>

          <Grid only='mobile' columns={2} className='show-combo-mobile'>
            {infoFilter.map((info, index) => {
              return (
                <Grid.Column key={index}>
                  <Image
                    style={{ minHeight: '200px' }}
                    size='big'
                    src={info.img}
                  />{' '}
                  <Header inverted textAlign='center' as='h2' icon>
                    {info.name}
                    <Header.Subheader> {info.description}</Header.Subheader>
                    <span>{info.price}</span>
                  </Header>
                  <Button
                    onClick={() => buyProduct(info, info.price, labelCount)}
                    color='black'
                  >
                    Comprar
                  </Button>
                </Grid.Column>
              );
            })}
          </Grid>
        </Container>
      </div>
      <div
        style={{
          minHeight: '300px',
          textAlign: 'center',
        }}
      >
        <Container style={{ marginTop: '50px' }}>
          <h1>Opiniões</h1>
          <Slider {...settingsQuotes}>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Hamburgeria Online começou no mês de Agosto de 2000, quando o
                proprietário que morava em São Paulo, decidiu retornar para
                Aracaju. Com um conceito inovador e com a qualidade das melhores
                pizzarias Paulistas, com pizzaiolos bem treinados conseguimos
                atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fuser_1.png?alt=media&token=fc272acb-0675-42ab-b5b8-4c40d6e83444'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Hamburgeria Online começou no mês de Agosto de 2000, quando o
                proprietário que morava em São Paulo, decidiu retornar para
                Aracaju. Com um conceito inovador e com a qualidade das melhores
                pizzarias Paulistas, com pizzaiolos bem treinados conseguimos
                atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fuser_2.png?alt=media&token=7f4d7ac4-b220-4123-a598-19ce2f524cbb'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Hamburgeria Online começou no mês de Agosto de 2000, quando o
                proprietário que morava em São Paulo, decidiu retornar para
                Aracaju. Com um conceito inovador e com a qualidade das melhores
                pizzarias Paulistas, com pizzaiolos bem treinados conseguimos
                atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fuser_3.png?alt=media&token=73f79afa-e7ef-4db9-990c-94e8300b495b'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Hamburgeria Online começou no mês de Agosto de 2000, quando o
                proprietário que morava em São Paulo, decidiu retornar para
                Aracaju. Com um conceito inovador e com a qualidade das melhores
                pizzarias Paulistas, com pizzaiolos bem treinados conseguimos
                atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='https://firebasestorage.googleapis.com/v0/b/shoppingonline-278e4.appspot.com/o/ImagesDeCardapio%2Fuser_4.png?alt=media&token=47b253b5-ea0d-45e6-963f-c38ed83fb7a3'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
          </Slider>
        </Container>
      </div>
      <Segment
        inverted
        vertical
        style={{ padding: '5em 0em', marginTop: '30px' }}
      >
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Páginas' />
                <List link inverted>
                  <List.Item as={Link} to='/home'>
                    Home
                  </List.Item>
                  <List.Item as={Link} to='/menu'>
                    Cárdapio
                  </List.Item>
                  <List.Item as={Link} to='/about'>
                    Sobre
                  </List.Item>
                  <List.Item as={Link} to='/cart'>
                    Carrinho
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Mais' />
                <List link inverted>
                  <List.Item as={Link} to='/login'>
                    Log In
                  </List.Item>
                  <List.Item as={Link} to='/signup'>
                    Crie Sua Conta
                  </List.Item>
                  <List.Item as={Link} to='/profile'>
                    Perfil
                  </List.Item>
                  <List.Item as={Link} to='/orders'>
                    Pedidos
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Hamburgeria Online
                </Header>
                <p>
                  Escolha um de nossos produtos e receba um delicioso hamburger
                  ou pizza em sua casa.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default Home;
