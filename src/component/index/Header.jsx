import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { checkUserStatus } from '../../redux/Slice';
const Header = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Function to handle the toggle button
  const mobileNavToggle = () => {
    setIsMobileNavActive(!isMobileNavActive);
    document.body.classList.toggle('mobile-nav-active');
  };

  // Function to close mobile nav when a link is clicked
  const closeMobileNav = () => {
    setIsMobileNavActive(false);
    document.body.classList.remove('mobile-nav-active');
  };

   const LogOut = (event)=>{
        event.preventDefault()
        var info = {role:undefined,isLoginStatus:false,user:undefined,token:undefined}
        dispatch(checkUserStatus(info))
        toast.success("logout successfully",{autoClose:500})
        setTimeout(navigate("/"),1000)
      }

  return (
    <header id="header" className="header fixed-top">
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <Link to="mailto:contact@example.com">contact@example.com</Link>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+1 5589 55488 55</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <Link to="#" className="twitter">
              <i className="bi bi-twitter-x"></i>
            </Link>
            <Link to="#" className="facebook">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="#" className="instagram">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="#" className="linkedin">
              <i className="bi bi-linkedin"></i>
            </Link>
            <ToastContainer/>
          </div>
        </div>
      </div>
      {/* End Top Bar */}

      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            {/* Uncomment the line below if you also wish to use an image logo */}
            {/* <img src="./public/index_accets/assets/img/logo.png" alt=""/> */}
            <h1 className="sitename">GoServe</h1>
            <span>.</span>
          </Link>

          <nav
            id="navmenu"
            className={`navmenu ${isMobileNavActive ? 'show' : ''}`}
          >
            <ul>
              <li>
                <Link to="/" onClick={closeMobileNav} className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={closeMobileNav}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={closeMobileNav}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="blog.html" onClick={closeMobileNav}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMobileNav}>
                  Contact
                </Link>
              </li>
      {!user_data.isLoginStatus ?<>
    <li>
      <Link to="/login" onClick={closeMobileNav}>Login</Link>
    </li>
    <li>
      <Link to="/register" onClick={closeMobileNav}>Register</Link>
    </li>
  </>
   :
    <>
      <li>
        <Link to="/user/UserBookings" onClick={closeMobileNav}>Your Bookings</Link>
      </li>
      <li>
        <Link to="/user/BookingService" onClick={closeMobileNav}> Booking a service </Link>
      </li>
      <li>
        <Link to="/changePassword" onClick={closeMobileNav}>Change Password</Link>
      </li>
      <li>
        <Link onClick={LogOut}>LogOut</Link>
      </li>
    </>
  
}

            
            </ul>
            <i
              className={`mobile-nav-toggle d-xl-none bi ${
                isMobileNavActive ? 'bi-x' : 'bi-list'
              }`}
              onClick={mobileNavToggle}
            ></i>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
  