import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
// console.log("user data ",user_data);
  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          {/* Logo Header */}
        </div>
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            {/* if user is admin */}
          {user_data.role == "Admin"? <ul className="nav nav-secondary">
              <li className="nav-item active">
                <Link to="/adminHome" className="collapsed" aria-expanded="false">
                  <p>E-Service App</p>
                </Link>
              </li>
              <li className="nav-section">
                <span className="sidebar-mini-icon">
                  <i className="fa fa-ellipsis-h"></i>
                </span>
                <h4 className="text-section">Tools</h4>
              </li>
              {/* Category Section */}
              <li className="nav-item">
                <Link
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="btn btn-link"
                >
                  <i className="fas fa-layer-group"></i>
                  <p>Category</p>
                  <span className="caret"></span>
                </Link>
                <div className={`collapse ${isCategoryOpen ? "show" : ""}`}>
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/add_category">
                        <span className="sub-item">Add Category</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/view_category">
                        <span className="sub-item">View Category</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Products Section */}
              <li className="nav-item">
                <Link
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className="btn btn-link"
                >
                  <i className="fas fa-box"></i>
                  <p>Sub Category</p>
                  <span className="caret"></span>
                </Link>
                <div className={`collapse ${isProductOpen ? "show" : ""}`}>
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/add_sub_category">
                        <span className="sub-item">Add Sub Category </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/View_sub_category">
                        <span className="sub-item">View Sub Catgeory</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* User Section */}
              <li className="nav-item">
                <Link
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="btn btn-link"
                >
                  <i className="fas fa-users"></i>
                  <p>User</p>
                  <span className="caret"></span>
                </Link>
                <div className={`collapse ${isUserOpen ? "show" : ""}`}>
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/admin/view_all_users">
                        <span className="sub-item">View All Users</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

            </ul> 
:  // if service provider show this 
<ul className="nav nav-secondary">
<li className="nav-item active">
  <Link to="/adminHome" className="collapsed" aria-expanded="false">
    <p>E-Service App</p>
  </Link>
</li>
<li className="nav-section">
  <span className="sidebar-mini-icon">
    <i className="fa fa-ellipsis-h"></i>
  </span>
  <h4 className="text-section">Tools</h4>
</li>
{/* Category Section */}
<li className="nav-item">
  <Link
    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
    className="btn btn-link"
  >
    <i className="fas fa-layer-group"></i>
    <p>Business</p>
    <span className="caret"></span>
  </Link>
  <div className={`collapse ${isCategoryOpen ? "show" : ""}`}>
    <ul className="nav nav-collapse">
      <li>
        <Link to="/admin/addnewBusiness">
          <span className="sub-item">Add My Business</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/view_business">
          <span className="sub-item">View My Business </span>
        </Link>
      </li>
    </ul>
  </div>
</li>

{/* Products Section */}
<li className="nav-item">
  <Link
    onClick={() => setIsProductOpen(!isProductOpen)}
    className="btn btn-link"
  >
    <i className="fas fa-box"></i>
    <p>Check Services</p>
    <span className="caret"></span>
  </Link>
  <div className={`collapse ${isProductOpen ? "show" : ""}`}>
    <ul className="nav nav-collapse">
      <li>
        <Link to="/admin/add_services">
          <span className="sub-item">Add Services</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/view_all_services">
          <span className="sub-item">View All Serviecss</span>
        </Link>
      </li>
    </ul>
  </div>
</li>

{/* User Section */}
<li className="nav-item">
  <Link
    onClick={() => setIsUserOpen(!isUserOpen)}
    className="btn btn-link"
  >
    <i className="fas fa-users"></i>
    <p>Booking</p>
    <span className="caret"></span>
  </Link>
  <div className={`collapse ${isUserOpen ? "show" : ""}`}>
    <ul className="nav nav-collapse">
      <li>
        <Link to="  ">
          <span className="sub-item">View All Booking's</span>
        </Link>
      </li>
    </ul>
  </div>
</li>

</ul>}
      
          </div>
        </div>
      </div>
      {/* End Sidebar */}
    </div>
  );
};

export default AdminSidebar;
