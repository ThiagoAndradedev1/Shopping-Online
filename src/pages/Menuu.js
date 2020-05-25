import React, { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  Grid,
  GridColumn,
  Segment,
  Divider,
  Header,
  Image,
  Input,
  Reveal,
} from 'semantic-ui-react';
import { firestore } from '../firebase';

const Menuu = () => {
  const [menuInfo, setMenuInfo] = useState([]);
  const [info, setInfo] = useState([]);
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    firestore.collection('menuinfo').onSnapshot((snapshot) => {
      const newInformation = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuInfo(newInformation);
      setInfo(newInformation);
    });
  }, []);

  const orderBy = (text) => {
    let filtered = menuInfo.filter((menu) => {
      return menu.tag.match(text);
    });
    setInfo(filtered);
  };

  const searchBy = (search) => {
    let filtered = menuInfo.filter((menu) => {
      return menu.name.toLowerCase().match(search.toLowerCase());
    });
    setInfo(filtered);
    console.log(menuInfo);
  };

  return (
    <div style={{ marginTop: '150px' }}>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Segment secondary>
            <Header as='h2' icon textAlign='center'>
              <Image
                size='massive'
                src='https://media.giphy.com/media/l1J9OJBbfEFY6YCK4/giphy.gif'
              />
              <Header.Content>Nosso Cardápio</Header.Content>
            </Header>
            <Divider />
            <div>
              <Button onClick={() => orderBy('hamburger')} color='red'>
                Hambúrger
              </Button>
              <Button onClick={() => orderBy('pizza')} color='red'>
                Pizzas
              </Button>
              <Button color='red'>Pizza Doce</Button>
              <Button color='red'>Porções</Button>
              <Button color='red'>Bebidas</Button>
              <Button color='red'>Condimentos</Button>
              <Button color='red'>Combos</Button>
              <Button color='red'>Exibir Todas Opções</Button>
            </div>
          </Segment>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
      <Grid columns={3}>
        <GridColumn width={4}></GridColumn>
        <GridColumn width={8}>
          <Menu attached='top' tabular>
            <Menu.Item
              name='bio'
              onClick={() => setActiveItem('bio')}
              active={activeItem === 'bio'}
            />
            <Menu.Item
              name='photos'
              onClick={() => setActiveItem('photos')}
              active={activeItem === 'photos'}
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input
                  onChange={(e) => searchBy(e.target.value)}
                  placeholder='Pesquisa...'
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>

          <Segment attached='bottom'>
            <Grid columns={3}>
              <Grid.Row>
                {info.map((info) => (
                  <Grid.Column key={info.id}>
                    <Image circular size='big' src={info.img} />{' '}
                    <Header as='h2' icon>
                      {info.name}
                      <Header.Subheader>{info.description}</Header.Subheader>
                      {info.price}
                    </Header>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Segment>
        </GridColumn>
        <GridColumn width={4}></GridColumn>
      </Grid>
    </div>
  );
};

export default Menuu;
