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


//Trang Client


//Navbar Client
import Navbar_Client from './pages/Client/Components/Navbar/Navbar_Client'

//Main
import Main from './pages/Client/Components/Main/Main';

//Dang Ky Chủ CSLT
import DangKyAccount from './pages/Client/DangKyCSLT/DangKyAccount'
import DangKyChuCslt from './pages/Client/DangKyCSLT/DangKyCCslt'
import DangKyCslt from './pages/Client/DangKyCSLT/DangKyCslt'

//khai báo trước
import AddKBT_Client from './pages/Client/KhaiBaoTruoc/AddKBT_Client';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <ToastContainer position='top-right' />
        <Switch>

          <Route exact path="/" component={Login} />

          <Route exact path="/login" component={Login} />

          {/* Client */}
          {/* <Route exact path="/client" component={Navbar_Client} /> */}
          {/* Đăng ký quản lý lưu trú */}
          <RouteWrapper exact path="/client" component={Main} layout={Navbar_Client} />
          <RouteWrapper exact path="/client_dk_b1" component={DangKyAccount} layout={Navbar_Client} />
          <RouteWrapper exact path="/client_dk_b2" component={DangKyChuCslt} layout={Navbar_Client} />
          <RouteWrapper exact path="/client_dk_b3" component={DangKyCslt} layout={Navbar_Client} />

          {/* Khai báo trước */}
          <RouteWrapper exact path="/client_kbt/:id" component={AddKBT_Client} layout={Navbar_Client} />


          {/* Home */}
          {/* <Route exact path="/home" component={Home} /> */}

          {/* dashboard */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} layout={Sidebar} />

          {/* user */}
          <PrivateRoute exact path="/users" component={ListUser} layout={Sidebar} />
          <PrivateRoute path="/addUser" component={AddUser} layout={Sidebar} />
          <PrivateRoute path="/updateUser/:id" component={EditUser} layout={Sidebar} />
          <PrivateRoute path="/viewUser/:id" component={ViewUser} layout={Sidebar} />

          {/* Nhân Viên */}
          <PrivateRoute exact path="/nhanvien" component={ListNV} layout={Sidebar} />
          <PrivateRoute path="/addNhanVien" component={AddNV} layout={Sidebar} />
          <PrivateRoute path="/updateNhanVien/:id" component={EditNV} layout={Sidebar} />
          <PrivateRoute path="/ViewNhanVien/:id" component={ViewNV} layout={Sidebar} />

          {/* Tin Tức */}
          <PrivateRoute exact path="/tintuc" component={ListTT} layout={Sidebar} />
          <PrivateRoute path="/addtintuc" component={AddTT} layout={Sidebar} />
          <PrivateRoute path="/updatetintuc/:id" component={EditTT} layout={Sidebar} />
          <PrivateRoute path="/Viewtintuc/:id" component={ViewTT} layout={Sidebar} />

          {/* Chủ Cơ Sở Lưu Trú */}
          <PrivateRoute exact path="/chucslt" component={ChuCSLT} layout={Sidebar} />
          <PrivateRoute path="/addchucslt" component={AddChuCSLT} layout={Sidebar} />
          <PrivateRoute path="/updatechucslt/:id" component={EditChuCSLT} layout={Sidebar} />
          <PrivateRoute path="/viewchucslt/:id" component={ViewChuCSLT} layout={Sidebar} />

          {/* Cơ Sở Lưu Trú */}
          <PrivateRoute exact path="/dg" component={ListDG} layout={Sidebar} />
          <PrivateRoute path="/adddg" component={AddDG} layout={Sidebar} />
          <PrivateRoute path="/updatedg/:id" component={EditDG} layout={Sidebar} />
          <PrivateRoute path="/viewcslt/:id" component={ViewCSLT} layout={Sidebar} />

          {/* Đánh Giá */}
          <PrivateRoute exact path="/cslt" component={CSLT} layout={Sidebar} />
          <PrivateRoute path="/addcslt" component={AddCSLT} layout={Sidebar} />
          <PrivateRoute path="/updatecslt/:id" component={EditCSLT} layout={Sidebar} />

          {/* Khai Báo Trước */}
          <PrivateRoute path="/kbt" component={ListKBT} layout={Sidebar} />
          <PrivateRoute path="/addkbt" component={AddKBT} layout={Sidebar} />
          <PrivateRoute path="/updatekbt/:id" component={EditKBT} layout={Sidebar} />

          {/* Người Nước Ngoài */}
          <PrivateRoute path="/nnn" component={ListNNN} layout={Sidebar} />
          <PrivateRoute path="/addnnn" component={AddNNN} layout={Sidebar} />
          <PrivateRoute path="/updatennn/:id" component={EditNNN} layout={Sidebar} />
          <PrivateRoute path="/viewnnn/:id" component={ViewNNN} layout={Sidebar} />

          {/* History Người Nước Ngoài */}
          <RouteWrapper path="/history/:id" component={History} layout={Sidebar} />

          {/* Lưu Trú */}
          <PrivateRoute path="/lt" component={ListLT} layout={Sidebar} />
          <PrivateRoute path="/addlt" component={AddLT} layout={Sidebar} />
          <PrivateRoute path="/updatelt/:id" component={EditLT} layout={Sidebar} />

          {/* Nhật Ký Lưu Trú */}
          <PrivateRoute path="/nklt" component={ListNKLT} layout={Sidebar} />
          <PrivateRoute path="/addnklt" component={AddNKLT} layout={Sidebar} />
          <PrivateRoute path="/updatenklt/:id" component={EditNKLT} layout={Sidebar} />


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
