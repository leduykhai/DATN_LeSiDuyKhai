import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authentication } from './pages/authentication';
import "./App.css"

import Login from './pages/Login/Login';

import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

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
          <RouteWrapper exact path="/users" component={ListUsers} layout={Sidebar} />
          <RouteWrapper path="/addUser" component={AddUser} layout={Sidebar} />
          <RouteWrapper path="/updateUser/:id" component={EditUser} layout={Sidebar} />
          <RouteWrapper path="/viewUser/:id" component={ViewUser} layout={Sidebar} />

          <RouteWrapper exact path="/Chu_CSLT" component={Chu_CSLT} layout={Sidebar} />
          <RouteWrapper path="/addChu_CSLT" component={AddEditChu_CSLT} layout={Sidebar} />
          <RouteWrapper path="/updateChu_CSLT/:id" component={AddEditChu_CSLT} layout={Sidebar} />
          <RouteWrapper path="/viewChu_CSLT/:id" component={viewChu_CSLT} layout={Sidebar} />

          <RouteWrapper path="/nguoinuocngoais" component={NguoiNuocNgoais} layout={Navbar} />
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
