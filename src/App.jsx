import React from 'react'
import { Route, Routes } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/index/Home';
import About from './component/index/About';
import Contact from './component/index/Contact';
import Services from './component/index/Services';
import Header from './component/index/Header';
import Footer from './component/index/Footer';
import Login from './component/index/Login';
import Register from './component/index/Register';
import { useSelector } from 'react-redux';
import AdminHome from './component/admin/AdminHome';
import AdminHeader from './component/admin/AdminHeader';
import AdminFooter from './component/admin/AdminFooter';
import UserHome from './component/user/UserHome';
import AdminSidebar from './component/admin/AdminSidebar';
import ForgetPassword from './component/index/ForgetPassword';
import AddCategory from './component/admin/mainAdmin/AddCategory';
import ViewCategory from './component/admin/mainAdmin/ViewCategory';
import ChangePassword from './component/user/ChangePassword';
import AddBusiness from './component/admin/serviceProvider/AddBusiness';
import ViewMyBusiness from './component/admin/serviceProvider/ViewMyBusiness';
import AddServices from './component/admin/serviceProvider/AddServices';
import ViewAllServices from './component/admin/serviceProvider/ViewAllServices';
import UserProfile from './component/index/UserProfile';
import ServiceProviderProfile from './component/admin/serviceProvider/ServiceProviderProfile';
import ViewAllMyBooking from './component/admin/serviceProvider/ViewAllMyBooking';
import BookService from './component/index/BookService';
import UserBooking from './component/index/UserBooking';
import AddSubCategory from './component/admin/mainAdmin/AddSubCategory';
import ViewSubCategory from './component/admin/mainAdmin/ViewSubCategory';
import VIewAllUsers from './component/admin/mainAdmin/VIewAllUsers';
import ViewAllUsers from './component/admin/mainAdmin/VIewAllUsers';

const App = () => {
const userData  = useSelector(state=> state.userData.value)
return (
  <div>
    {userData.role == "User" || userData.role == undefined ? <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/services' element={<Services/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forgetPassword'element={<ForgetPassword/>}></Route>
        <Route path='/changePassword'element={<ChangePassword/>}></Route>
        <Route path='/user/userProfile'element={<UserProfile/>}></Route>
        <Route path='/user/BookingService'element={<BookService/>}></Route>
        <Route path='/user/UserBookings'element={<UserBooking/>}></Route>

      </Routes>
      <Footer/>
      </div>
    : ((userData.role == "Admin" ||userData.role == "ServiceProvider" ) ? <div>
     <div className='wapper'>
          <AdminSidebar/>
          <div className='main-panel'>
            <AdminHeader/>
          <Routes>
          <Route path="/adminHome" element={<AdminHome/>}></Route>
          <Route path="/admin/add_category" element={<AddCategory/>}></Route>
          <Route path="/admin/add_sub_category" element={<AddSubCategory/>}></Route>
          <Route path="/admin/View_sub_category" element={<ViewSubCategory/>}></Route>
          <Route path="/admin/view_category" element={<ViewCategory/>}></Route>
          <Route path='/admin/addnewBusiness'element={<AddBusiness/>}></Route>
          <Route path='/admin/view_business'element={<ViewMyBusiness/>}></Route>
          <Route path="/admin/add_services" element={<AddServices/>}></Route>
         <Route path="/admin/view_all_services" element={<ViewAllServices/>}></Route>
         <Route path="/admin/view_all_users" element={<ViewAllUsers/>}></Route>
         <Route path="/admin/ServiceProfile" element={<ServiceProviderProfile/>}></Route>
        <Route path='/changePassword'element={<ChangePassword/>}></Route>
        <Route path='/admin/viewAllBookings'element={<ViewAllMyBooking/>}></Route>
          </Routes>
          <AdminFooter/>
          </div>
        </div>
    </div> :"")}
    
    </div>
  )
}

export default App
