import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { authentication } from './pages/authentication';
import "./App.css"

import Login from './pages/Login/Login';

import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

import Dashboard from './pages/Dashboard/Dashboard';

import ListUser from './pages/User/ListUser';
import AddUser from './pages/User/AddUser';
import EditUser from './pages/User/EditUser';
import ViewUser from './pages/User/ViewUser';

import ListNV from './pages/NhanVien/ListNV';
import AddNV from './pages/NhanVien/AddNV';
import EditNV from './pages/NhanVien/EditNV';
import ViewNV from './pages/NhanVien/ViewNV';

import ListNNN from './pages/NguoiNuocNgoai/ListNNN';
import AddNNN from './pages/NguoiNuocNgoai/AddNNN';
import EditNNN from './pages/NguoiNuocNgoai/EditNNN';
import ViewNNN from './pages/NguoiNuocNgoai/ViewNNN';

import ListTT from './pages/TinTuc/ListTT';
import AddTT from './pages/TinTuc/AddTT';
import EditTT from './pages/TinTuc/EditTT';
import ViewTT from './pages/TinTuc/ViewTT';

import ChuCSLT from './pages/Chu_CSLT/ListChuCSLT';
import AddChuCSLT from './pages/Chu_CSLT/AddChuCSLT';
import EditChuCSLT from './pages/Chu_CSLT/EditChuCSLT';
import ViewChuCSLT from './pages/Chu_CSLT/ViewChuCSLT';

import CSLT from './pages/CoSoLuuTru/ListCSLT';
import AddCSLT from './pages/CoSoLuuTru/AddCSLT';
import EditCSLT from './pages/CoSoLuuTru/EditCSLT';
import ViewCSLT from './pages/CoSoLuuTru/ViewCSLT';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='bottom-right' />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />

          <RouteWrapper exact path="/dashboard" component={Dashboard} layout={Sidebar} />

          <RouteWrapper exact path="/users" component={ListUser} layout={Sidebar} />
          <RouteWrapper path="/addUser" component={AddUser} layout={Sidebar} />
          <RouteWrapper path="/updateUser/:id" component={EditUser} layout={Sidebar} />
          <RouteWrapper path="/viewUser/:id" component={ViewUser} layout={Sidebar} />

          <RouteWrapper exact path="/nhanvien" component={ListNV} layout={Sidebar} />
          <RouteWrapper path="/addNhanVien" component={AddNV} layout={Sidebar} />
          <RouteWrapper path="/updateNhanVien/:id" component={EditNV} layout={Sidebar} />
          <RouteWrapper path="/ViewNhanVien/:id" component={ViewNV} layout={Sidebar} />

          <RouteWrapper exact path="/tintuc" component={ListTT} layout={Sidebar} />
          <RouteWrapper path="/addtintuc" component={AddTT} layout={Sidebar} />
          <RouteWrapper path="/updatetintuc/:id" component={EditTT} layout={Sidebar} />
          <RouteWrapper path="/Viewtintuc/:id" component={ViewTT} layout={Sidebar} />

          <RouteWrapper exact path="/chucslt" component={ChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/addchucslt" component={AddChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/updatechucslt/:id" component={EditChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/viewchucslt/:id" component={ViewChuCSLT} layout={Sidebar} />

          <RouteWrapper exact path="/cslt" component={CSLT} layout={Sidebar} />
          <RouteWrapper path="/addcslt" component={AddCSLT} layout={Sidebar} />
          <RouteWrapper path="/updatecslt/:id" component={EditCSLT} layout={Sidebar} />
          <RouteWrapper path="/viewcslt/:id" component={ViewCSLT} layout={Sidebar} />

          <RouteWrapper path="/nnn" component={ListNNN} layout={Sidebar} />
          <RouteWrapper path="/addnnn" component={AddNNN} layout={Sidebar} />
          <RouteWrapper path="/updatennn/:id" component={EditNNN} layout={Sidebar} />
          <RouteWrapper path="/viewnnn/:id" component={ViewNNN} layout={Sidebar} />
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
