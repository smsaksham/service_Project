import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast, ToastContainer } from 'react-toastify'
import { checkUserStatus } from "../../redux/Slice";
const AdminHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user_data = useSelector((state) => state.userData.value);
  const name = user_data?.name || "Admin";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

    const logoutAdmin = (event)=>{
      event.preventDefault()
      var info = {role:undefined,isLoginStatus:false,user:undefined,token:undefined}
      dispatch(checkUserStatus(info))
      toast.success("logout successfully",{autoClose:500})
      setTimeout(navigate("/"),1000)
    }
  return (
    <div className="main-header">
      <div className="main-header-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to="/adminHome" className="logo">
            <img
              src="assets/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </Link>
        </div>
      </div>
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            {/* Profile Dropdown */}
            <li className="nav-item topbar-user dropdown hidden-caret">
              <button
                className="dropdown-toggle profile-pic btn"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <div className="avatar-sm">
                  <img
                    src="admin_assets/img/profile.jpg"
                    alt="Profile"
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span>
                  <span className="fw-bold"> {name}</span>
                </span>
              </button>
              <ul
                className={`dropdown-menu dropdown-user animated fadeIn ${
                  dropdownOpen ? "show" : ""
                }`}
              >
                <li>
                  <div className="user-box">
                    <div className="avatar-lg">
                      <img
                        src="admin_assets/img/profile.jpg"
                        alt="profile"
                        className="avatar-img rounded"
                      />
                    </div>
                    <div className="u-text">
                      <h4>{name}</h4>
                      <p className="text-muted">{user_data.email}</p>
                      {user_data.role == "ServiceProvider" ? <Link to="/admin/ServiceProfile" className="btn btn-sm btn-secondary">
                        View Profile
                      </Link>:<Link to="/user/userProfile" className="btn btn-sm btn-secondary">
                        View Profile
                      </Link> }
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    My Profile
                  </Link>
                  <Link className="dropdown-item" to="#">
                    My Balance
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Inbox
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    Account Setting
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#" onClick={logoutAdmin}>
                    Logout
                  </Link>
                </li>
        <ToastContainer/>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
