import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

import Dashboard from './pages/Dashboard';

import Signup from './pages/Signup';
import Login from './pages/Login';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header>
            <Header></Header>
          </header>
          <div>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
          <footer>
            <Footer></Footer>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
