import React, { useEffect } from 'react'
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payement from './Payement';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

function App() {
  const [{}, dispatch] = useStateValue();
  const promise = loadStripe('pk_test_51I6hSUGjGrkWUe4QyEFGqlvZMuk7jblGV2FjrGJf4jyqu0mrKl14q5TKePtBpV10Lc09anlM96qBcpugwiaM33lQ00kByEgd5W');

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //the user just logged in or the use was loged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // user loged out
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
    })
  }, [])
  return (
    //BEM
    <Router>
      <div className="app">
        
        
        <Switch>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout />
          </Route>
          <Route path="/payement">
            <Header/>
            <Elements stripe={promise}>
              <Payement />
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
