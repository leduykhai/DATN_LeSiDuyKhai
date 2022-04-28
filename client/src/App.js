import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authentication } from './pages/authentication';
import "./App.css"

import Login from './pages/admin/Login';
import Admins from './pages/admin/Admins';
import AddEdit from './pages/admin/AddEdit';
import View from './pages/admin/View';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='top-center' />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admins" component={Admins} />
          <Route path="/addAdmin" component={AddEdit} />
          <Route path="/updateAdmin/:id" component={AddEdit} />
          <Route path="/viewAdmin/:id" component={View} />
        </Switch>
      </div>
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
