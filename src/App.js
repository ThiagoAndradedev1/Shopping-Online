import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CalculationState from './context/calculation/CalculationState';
import Home from '../src/pages/Home';
import Navbar from '../src/layout/Navbar';
import Login from '../src/pages/Login';
import Cart from '../src/pages/Cart';
import Cardapio from './pages/Cardapio';
import Signup from '../src/pages/Signup';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <CalculationState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/menu' component={Cardapio} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Router>
      </CalculationState>
    </Fragment>
  );
};

export default App;
