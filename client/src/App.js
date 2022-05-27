import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authentication } from './pages/authentication';
import "./App.css"

import Login from './pages/Login/Login';

import Tabbar from './components/Sidenav/Tabbar';

import ListUsers from './pages/User/ListUsers';
import AddUser from './pages/User/AddUser';
import EditUser from './pages/User/EditUser';
import ViewUser from './pages/User/ViewUser';

import Chu_CSLT from './pages/Chu_CSLT/Chu_CSLT';
import AddEditChu_CSLT from './pages/Chu_CSLT/AddEdit';
import viewChu_CSLT from './pages/Chu_CSLT/View';

import NguoiNuocNgoais from './pages/nguoinuocngoai/NguoiNuocNgoais';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='bottom-left' />
        <Switch>
          <Route exact path="/" component={Login} />
          <RouteWrapper exact path="/users" component={ListUsers} layout={Tabbar} />
          <RouteWrapper path="/addUser" component={AddUser} layout={Tabbar} />
          <RouteWrapper path="/updateUser/:id" component={EditUser} layout={Tabbar} />
          <RouteWrapper path="/viewUser/:id" component={ViewUser} layout={Tabbar} />

          <RouteWrapper exact path="/Chu_CSLT" component={Chu_CSLT} layout={Tabbar} />
          <RouteWrapper path="/addChu_CSLT" component={AddEditChu_CSLT} layout={Tabbar} />
          <RouteWrapper path="/updateChu_CSLT/:id" component={AddEditChu_CSLT} layout={Tabbar} />
          <RouteWrapper path="/viewChu_CSLT/:id" component={viewChu_CSLT} layout={Tabbar} />

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
