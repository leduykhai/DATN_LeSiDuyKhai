import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { authentication } from './pages/authentication'

import Login from './pages/admin/Login';
import admin from './pages/admin/admin';


function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} />
      <Route path="/admin" component={admin} />
    </BrowserRouter>
  );
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

function PrivateRoute({ component: Component, layout: Layout, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        authentication.isAuthentication() ?
          (<Layout {...props}>
            <Component {...props} />
          </Layout>)
          :
          (<Redirect to="/login" />)
      )}
    />
  )
}

function PrivateRoute2({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        authentication.isAuthentication() ?
          (<Component {...props} />)
          :
          (<Redirect to="/login" />)
      )}
    />
  )
}

export default App;
