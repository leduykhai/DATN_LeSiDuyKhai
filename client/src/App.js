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


//User
import ListUser from './pages/User/ListUser';
import AddUser from './pages/User/AddUser';
import EditUser from './pages/User/EditUser';
import ViewUser from './pages/User/ViewUser';

//Nhan Vien
import ListNV from './pages/NhanVien/ListNV';
import AddNV from './pages/NhanVien/AddNV';
import EditNV from './pages/NhanVien/EditNV';
import ViewNV from './pages/NhanVien/ViewNV';

//Tin Tuc
import ListTT from './pages/TinTuc/ListTT';
import AddTT from './pages/TinTuc/AddTT';
import EditTT from './pages/TinTuc/EditTT';
import ViewTT from './pages/TinTuc/ViewTT';

//Chu Co So Luu Tru
import ChuCSLT from './pages/Chu_CSLT/ListChuCSLT';
import AddChuCSLT from './pages/Chu_CSLT/AddChuCSLT';
import EditChuCSLT from './pages/Chu_CSLT/EditChuCSLT';
import ViewChuCSLT from './pages/Chu_CSLT/ViewChuCSLT';

//Co So Luu Tru
import CSLT from './pages/CoSoLuuTru/ListCSLT';
import AddCSLT from './pages/CoSoLuuTru/AddCSLT';
import EditCSLT from './pages/CoSoLuuTru/EditCSLT';
import ViewCSLT from './pages/CoSoLuuTru/ViewCSLT';

//Danh Gia
import ListDG from './pages/DanhGia/ListDG';
import AddDG from './pages/DanhGia/AddDG';
import EditDG from './pages/DanhGia/EditDG';

//Khai Bao Truoc
import ListKBT from './pages/KhaiBaoTruoc/ListKBT';
import AddKBT from './pages/KhaiBaoTruoc/AddKBT';
import EditKBT from './pages/KhaiBaoTruoc/EditKBT';

//Nguoi Nuoc Ngoai
import ListNNN from './pages/NguoiNuocNgoai/ListNNN';
import AddNNN from './pages/NguoiNuocNgoai/AddNNN';
import EditNNN from './pages/NguoiNuocNgoai/EditNNN';
import ViewNNN from './pages/NguoiNuocNgoai/ViewNNN';

//Nguoi Nuoc Ngoai Hystory
import History from './pages/NguoiNuocNgoai/Detail/Hiystory';

//Luu Tru
import ListLT from './pages/LuuTru/ListLT';
import AddLT from './pages/LuuTru/AddLT';
import EditLT from './pages/LuuTru/EditLT';

//Nhat Ky Luu Tru
import ListNKLT from './pages/NhatKyLuuTru/ListNKLT';
import AddNKLT from './pages/NhatKyLuuTru/AddNKLT';
import EditNKLT from './pages/NhatKyLuuTru/EditNKLT';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='bottom-right' />
        <Switch>

          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />

          {/* dashboard */}
          <RouteWrapper exact path="/dashboard" component={Dashboard} layout={Sidebar} />

          {/* user */}
          <RouteWrapper exact path="/users" component={ListUser} layout={Sidebar} />
          <RouteWrapper path="/addUser" component={AddUser} layout={Sidebar} />
          <RouteWrapper path="/updateUser/:id" component={EditUser} layout={Sidebar} />
          <RouteWrapper path="/viewUser/:id" component={ViewUser} layout={Sidebar} />

          {/* Nhân Viên */}
          <RouteWrapper exact path="/nhanvien" component={ListNV} layout={Sidebar} />
          <RouteWrapper path="/addNhanVien" component={AddNV} layout={Sidebar} />
          <RouteWrapper path="/updateNhanVien/:id" component={EditNV} layout={Sidebar} />
          <RouteWrapper path="/ViewNhanVien/:id" component={ViewNV} layout={Sidebar} />

          {/* Tin Tức */}
          <RouteWrapper exact path="/tintuc" component={ListTT} layout={Sidebar} />
          <RouteWrapper path="/addtintuc" component={AddTT} layout={Sidebar} />
          <RouteWrapper path="/updatetintuc/:id" component={EditTT} layout={Sidebar} />
          <RouteWrapper path="/Viewtintuc/:id" component={ViewTT} layout={Sidebar} />

          {/* Chủ Cơ Sở Lưu Trú */}
          <RouteWrapper exact path="/chucslt" component={ChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/addchucslt" component={AddChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/updatechucslt/:id" component={EditChuCSLT} layout={Sidebar} />
          <RouteWrapper path="/viewchucslt/:id" component={ViewChuCSLT} layout={Sidebar} />

          {/* Cơ Sở Lưu Trú */}
          <RouteWrapper exact path="/dg" component={ListDG} layout={Sidebar} />
          <RouteWrapper path="/adddg" component={AddDG} layout={Sidebar} />
          <RouteWrapper path="/updatedg/:id" component={EditDG} layout={Sidebar} />

          {/* Đánh Giá */}
          <RouteWrapper exact path="/cslt" component={CSLT} layout={Sidebar} />
          <RouteWrapper path="/addcslt" component={AddCSLT} layout={Sidebar} />
          <RouteWrapper path="/updatecslt/:id" component={EditCSLT} layout={Sidebar} />

          {/* Khai Báo Trước */}
          <RouteWrapper path="/kbt" component={ListKBT} layout={Sidebar} />
          <RouteWrapper path="/addkbt" component={AddKBT} layout={Sidebar} />
          <RouteWrapper path="/updatekbt/:id" component={EditKBT} layout={Sidebar} />

          {/* Người Nước Ngoài */}
          <RouteWrapper path="/nnn" component={ListNNN} layout={Sidebar} />
          <RouteWrapper path="/addnnn" component={AddNNN} layout={Sidebar} />
          <RouteWrapper path="/updatennn/:id" component={EditNNN} layout={Sidebar} />
          <RouteWrapper path="/viewnnn/:id" component={ViewNNN} layout={Sidebar} />

          {/* History Người Nước Ngoài */}
          <RouteWrapper path="/history/:id" component={History} layout={Sidebar} />

          {/* Lưu Trú */}
          <RouteWrapper path="/lt" component={ListLT} layout={Sidebar} />
          <RouteWrapper path="/addlt" component={AddLT} layout={Sidebar} />
          <RouteWrapper path="/updatelt/:id" component={EditLT} layout={Sidebar} />

          {/* Nhật Ký Lưu Trú */}
          <RouteWrapper path="/nklt" component={ListNKLT} layout={Sidebar} />
          <RouteWrapper path="/addnklt" component={AddNKLT} layout={Sidebar} />
          <RouteWrapper path="/updatenklt/:id" component={EditNKLT} layout={Sidebar} />


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
