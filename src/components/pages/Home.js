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
  const { addTransaction, transactions } = useContext(calculationContext);

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
      transactions[resultado].labelCount = labelCount +=
        transactions[resultado].labelCount;
      transactions[resultado].price = transactions[resultado].price += Number(
        price
      );
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
                A Pizzaria A Paulistinha começou no mês de Agosto de 2000,
                quando o proprietário que morava em São Paulo, decidiu retornar
                para Aracaju. Com um conceito inovador e com a qualidade das
                melhores pizzarias Paulistas, com pizzaiolos bem treinados
                conseguimos atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='https://cdn4.iconfinder.com/data/icons/flatfaces-everyday-people-circular/125/flatfaces23-512.png'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Pizzaria A Paulistinha começou no mês de Agosto de 2000,
                quando o proprietário que morava em São Paulo, decidiu retornar
                para Aracaju. Com um conceito inovador e com a qualidade das
                melhores pizzarias Paulistas, com pizzaiolos bem treinados
                conseguimos atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='data:image/jpeg;base64,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'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Pizzaria A Paulistinha começou no mês de Agosto de 2000,
                quando o proprietário que morava em São Paulo, decidiu retornar
                para Aracaju. Com um conceito inovador e com a qualidade das
                melhores pizzarias Paulistas, com pizzaiolos bem treinados
                conseguimos atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='data:image/jpeg;base64,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'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
            <div>
              <p style={{ fontSize: '2.00em' }}>
                A Pizzaria A Paulistinha começou no mês de Agosto de 2000,
                quando o proprietário que morava em São Paulo, decidiu retornar
                para Aracaju. Com um conceito inovador e com a qualidade das
                melhores pizzarias Paulistas, com pizzaiolos bem treinados
                conseguimos atender as expectativas dos nossos clientes.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Image
                  avatar
                  src='data:image/jpeg;base64,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'
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </div>
          </Slider>
        </Container>
      </div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
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
