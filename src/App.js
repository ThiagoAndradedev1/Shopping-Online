import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthState from './context/authentication/AuthState';
import CalculationState from './context/calculation/CalculationState';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Login from './components/pages/Login';
import Cart from './components/pages/Cart';
import Cardapio from './components/pages/Cardapio';
import Profile from './components/pages/Profile';
import Signup from './components/pages/Signup';
import Orders from './components/pages/Orders';
import About from './components/pages/About';
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
      <AuthState>
        <CalculationState>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/'>
                <Redirect to='/home' />
              </Route>
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/menu' component={Cardapio} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/about' component={About} />
              <Route exact path='/orders' component={Orders} />
            </Switch>
          </Router>
        </CalculationState>
      </AuthState>
    </Fragment>
  );
};

export default App;
