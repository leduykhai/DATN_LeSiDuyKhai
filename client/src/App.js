import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authentication } from './pages/authentication';
import "./App.css"

import Login from './pages/Login/Login';

import Tabbar from './components/Sidenav/Tabbar';

import Users from './pages/User/Users';
import AddEdit from './pages/User/AddEdit';
import View from './pages/User/View';

import NguoiDungs from './pages/nguoidung/NguoiDungs';

import NguoiNuocNgoais from './pages/nguoinuocngoai/NguoiNuocNgoais';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='bottom-left' />
        <Switch>
          <Route exact path="/" component={Login} />
          <RouteWrapper exact path="/users" component={Users} layout={Tabbar} />
          <RouteWrapper path="/addUser" component={AddEdit} layout={Tabbar} />
          <RouteWrapper path="/updateUser/:id" component={AddEdit} layout={Tabbar} />
          <RouteWrapper path="/viewUser/:id" component={View} layout={Tabbar} />

          <RouteWrapper path="/nguoidungs" component={NguoiDungs} layout={Tabbar} />

          <RouteWrapper path="/nguoinuocngoais" component={NguoiNuocNgoais} layout={Tabbar} />
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
