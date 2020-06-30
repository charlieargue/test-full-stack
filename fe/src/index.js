import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './ui/styles.css';
import App from './App';
import ApplicationLayout from './components/layout/ApplicationLayout';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import GLOBALS from './globals';

// --------------
const httpLink = new HttpLink({
  uri: GLOBALS.API.BASE_URL,
})

// --------------
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})
// --------------
// --------------
// --------------
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <ApplicationLayout> 
            <App />
          </ApplicationLayout>
        </Suspense>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

