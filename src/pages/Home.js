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

const settings2 = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
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
        <Segment inverted style={{ minHeight: '700px' }} textAlign='center'>
          <Container text>
            <Slider {...settings2}>
              <div>
                <Header
                  inverted
                  content='Imagine-a-Company'
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
                  content='Do whatever you want when you want to.'
                  style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                  }}
                />
                <Button color='red' size='huge'>
                  Cardápio
                  <Icon name='right arrow' />
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
            {/* <Header
                  as='h1'
                  inverted
                  content='Imagine-a-Company'
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
                  content='Do whatever you want when you want to.'
                  style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                  }}
                />
                <Button primary size='huge'>
                  Get Started
                  <Icon name='right arrow' />
                </Button> */}
          </Container>
        </Segment>
      </div>
      <Container style={{ marginTop: '100px' }}>
        <div>
          <h1>Mais Vendidos</h1>
          <Slider {...settings}>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
            <div>
              <div className='card'>
                <Segment textAlign='center' raised>
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
                  <Button color='red'>Comprar</Button>
                </Segment>
              </div>
            </div>
          </Slider>
        </div>
      </Container>

      {/* <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Image avatar src='/images/avatar/large/nan.jpg' />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on content creation and hard work, we have
            learned how to master the art of doing nothing by providing massive
            amounts of whitespace and generic content that can seem massive,
            monolithic and worth your attention.
          </p>
          <Button as='a' size='large'>
            Read More
          </Button>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Case Studies</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Yes I know you probably disregarded the earlier boasts as
            non-sequitur filler content, but it's really true. It took years of
            gene splicing and combinatory DNA research, but our bananas can
            really dance.
          </p>
          <Button as='a' size='large'>
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment> */}
    </Fragment>
  );
};

export default Home;
