import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import './App.css';

// components
import Header from './components/Header';
import Footer from './components/Footer';

// pages
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddRoadtrip from './pages/AddRoadtrip';
import SingleRoadtrip from './pages/Roadtrip';


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
              <Route exact path="/addTrip" component={AddRoadtrip} />
              <Route exact path='/roadtrip/:id' component={SingleRoadtrip} />
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
