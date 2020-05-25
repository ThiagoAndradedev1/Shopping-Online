import React, { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Home from '../src/pages/Home';
import Navbar from '../src/layout/Navbar';
import Login from '../src/pages/Login';
import Cart from '../src/pages/Cart';
import Menuu from './pages/Menuu';
import Signup from '../src/pages/Signup';
import AnimationState from './context/animation/AnimationState';
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
      <AnimationState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
            <Route exact path='/menu' component={Menuu} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </Router>
      </AnimationState>
    </Fragment>
  );
};

export default App;
