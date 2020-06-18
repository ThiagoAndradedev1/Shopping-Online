import React, { Fragment } from 'react';
import Slider from 'react-slick';
import {
  Container,
  Card,
  Icon,
  Grid,
  List,
  Divider,
  Image,
  Segment,
  Header,
  Button,
} from 'semantic-ui-react';

const SampleNextArrow = () => {
  return (
    <Button
      onClick={() => Slider.slickNext()}
      style={{ display: 'block' }}
      color='black'
    >
      +
    </Button>
  );
};

const SamplePrevArrow = () => {
  return <Button color='black'>-</Button>;
};

const settingsBestSelling = {
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
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
};

const settingsWelcomeModal = {
  dots: true,
  infinite: true,
  speed: 500,
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
  return (
    <Fragment>
      <div style={{ marginTop: '70px' }}>
        <div
          className='segment-background'
          style={{
            minHeight: '700px',
            textAlign: 'center',
          }}
        >
          <Container text>
            <Slider {...settingsBestSelling}>
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
                <Button color='black' size='huge'>
                  Cardápio
                </Button>
              </div>
              <div>
                <h3>2</h3>
                <p>Hello</p>
              </div>
              <div>
                <h3>3</h3>
                <p>See ....</p>
                <p>Height is adaptive</p>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
          </Container>
        </div>
      </div>
      <div className='segment-background2'></div>
      <Container style={{ marginTop: '40px' }}>
        {/* <div
          className='segment-background3'
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
                  quando o proprietário que morava em São Paulo, decidiu
                  retornar para Aracaju. Com um conceito inovador e com a
                  qualidade das melhores pizzarias Paulistas, com pizzaiolos bem
                  treinados conseguimos atender as expectativas dos nossos
                  clientes.
                </p>
                <h3> - João Paulo</h3>
              </div>
              <div>
                <h3>1</h3>
              </div>
            </Slider>
          </Container>
        </div> */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.93em' }}>Mais Vendidos</h1>
          <p style={{ fontSize: '1.73em' }}>
            Veja os produtos mais queridos do nosso Cárdapio.
          </p>
          <Slider {...settingsWelcomeModal}>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader>Hamburger</Header.Subheader>
                  <span>$25.50</span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader>Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
            <div>
              <div className='card'>
                <Image
                  circular
                  size='big'
                  src='data:image/jpeg;base64,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'
                />{' '}
                <Header textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </div>
            </div>
          </Slider>
        </div>
      </Container>
      <div
        className='segment-background2'
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
              // marginBottom: '0px',
              // marginTop: '3em',
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
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Image
                  style={{ minHeight: '200px' }}
                  circular
                  size='big'
                  src='https://www.kiburguers.com.br/imagens_prod/11595c1.png'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
              <Grid.Column>
                <Image
                  style={{ minHeight: '200px' }}
                  circular
                  size='big'
                  src='https://mlksc3e5a4bz.i.optimole.com/w:760/h:614/q:auto/http://pittsburg.com.br/wp-content/uploads/2018/04/04-1.png'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
              <Grid.Column>
                <Image
                  style={{ minHeight: '200px' }}
                  size='big'
                  src='https://pao938.files.wordpress.com/2017/05/pizzas.png?w=392&h=220'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Image
                  circular
                  size='big'
                  src='https://www.bianbiadelivery.com.br/imagens_prod/10301Combo%202.png'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
              <Grid.Column>
                <Image
                  size='big'
                  src='https://champspizza.podepedir.com.br/uploads/podepedir-como-familia-1-136-5ba169d10b3e2.png'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
              <Grid.Column>
                <Image
                  size='big'
                  src='https://pizzadopardal.com.br/wp-content/uploads/2019/10/combo-2-600x600.png'
                />{' '}
                <Header inverted textAlign='center' as='h2' icon>
                  Hamburger
                  <Header.Subheader> Hamburger</Header.Subheader>
                  <span>$25.50 </span>
                </Header>
                <Button color='black'>Comprar</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <div
        // className='segment-background3'
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
              <h3> - João Paulo</h3>
            </div>
            <div>
              <h3>1</h3>
            </div>
          </Slider>
        </Container>
      </div>
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Sitemap</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Religious Ceremonies</List.Item>
                  <List.Item as='a'>Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>Banana Pre-Order</List.Item>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                  <List.Item as='a'>Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
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
