import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Webservices from '../../services/Webservices';
import WebAPI from '../../services/WebAPI';

const AdminHome = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [TotalBusiness,setTotalBusiness] = useState([])
  const [TotalUsers,setTotalUser] = useState([])
  const [TotalCategory,setTotalCategory] = useState([])
  const [TotalSubCategory,setTotalSubCategory] = useState([])
  
useEffect(()=>{
loadAdminDeshbord()
},[])
const loadAdminDeshbord = async()=>{
  const resp = await Webservices.getAPICall(WebAPI.adminDeshbord)
  console.log("resp is : ",resp);
  setTotalBusiness(resp.data.total_businesses)
  setTotalUser(resp.data.total_user)
  setTotalCategory(resp.data.total_category)
  setTotalSubCategory(resp.data.total_subCategory)
}

  return <div className="container">
    <div className="page-inner">
      <div
        className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
      >
        <div>
          <h3 className="fw-bold mb-3">Dashboard</h3>
          <h6 className="op-7 mb-2">Free Bootstrap 5 Admin Dashboard</h6>
        </div>
        <div className="ms-md-auto py-2 py-md-0">
          <Link to="#" className="btn btn-label-info btn-round me-2">Manage</Link>
          <Link to="#" className="btn btn-primary btn-round">Add Customer</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-primary bubble-shadow-small"
                  >
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">All Users</p>
                    <h4 className="card-title">{!TotalUsers ? "112" : TotalUsers.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-info bubble-shadow-small"
                  >
                    <i className="fas fa-user-check"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Businesse's</p>
                    <h4 className="card-title">{!TotalBusiness ? "0" : TotalBusiness.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-success bubble-shadow-small"
                  >
                    <i className="fas fa-luggage-cart"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Categoryes</p>
                    <h4 className="card-title">{TotalCategory.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div
                    className="icon-big text-center icon-secondary bubble-shadow-small"
                  >
                    <i className="far fa-check-circle"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Sub-Category</p>
                    <h4 className="card-title">{TotalSubCategory.length}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-round">
            <div className="card-header">
              <div className="card-head-row card-tools-still-right">
                <h4 className="card-title">Users Geolocation</h4>
                <div className="card-tools">
                  <button
                    className="btn btn-icon btn-link btn-primary btn-xs"
                  >
                    <span className="fa fa-angle-down"></span>
                  </button>
                  <button
                    className="btn btn-icon btn-link btn-primary btn-xs btn-refresh-card"
                  >
                    <span className="fa fa-sync-alt"></span>
                  </button>
                  <button
                    className="btn btn-icon btn-link btn-primary btn-xs"
                  >
                    <span className="fa fa-times"></span>
                  </button>
                </div>
              </div>
              <p className="card-category">
                Map of the distribution of users around the world
              </p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="table-responsive table-hover table-sales">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/id.png"
                                alt="indonesia"
                              />
                            </div>
                          </td>
                          <td>Indonesia</td>
                          <td className="text-end">2.320</td>
                          <td className="text-end">42.18%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/us.png"
                                alt="united states"
                              />
                            </div>
                          </td>
                          <td>USA</td>
                          <td className="text-end">240</td>
                          <td className="text-end">4.36%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/au.png"
                                alt="australia"
                              />
                            </div>
                          </td>
                          <td>Australia</td>
                          <td className="text-end">119</td>
                          <td className="text-end">2.16%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/ru.png"
                                alt="russia"
                              />
                            </div>
                          </td>
                          <td>Russia</td>
                          <td className="text-end">1.081</td>
                          <td className="text-end">19.65%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/cn.png"
                                alt="china"
                              />
                            </div>
                          </td>
                          <td>China</td>
                          <td className="text-end">1.100</td>
                          <td className="text-end">20%</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="flag">
                              <img
                                src="admin_assets/img/flags/br.png"
                                alt="brazil"
                              />
                            </div>
                          </td>
                          <td>Brasil</td>
                          <td className="text-end">640</td>
                          <td className="text-end">11.63%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mapcontainer">
                    <div
                      id="world-map"
                      className="w-100"
                      style={{ height: '300px' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card card-round">
            <div className="card-body">
              <div className="card-head-row card-tools-still-right">
                <div className="card-title">New Customers</div>
                <div className="card-tools">
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-clean me-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="#">Action</Link>
                      <Link className="dropdown-item" to="#">Another action</Link>
                      <Link className="dropdown-item" to="#"
                      >Something else here</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-list py-4">
                {TotalUsers.map((uobj)=>{
                  return      <div className="item-list">
                  <div className="avatar">
                    <img
                      src="admin_assets/img/jm_denis.jpg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="info-user ms-3">
                    <div className="username">{uobj.name}</div>
                    <div className="status">{uobj.role}</div>
                  </div>
                  <button className="btn btn-icon btn-link op-8 me-1">
                    <i className="far fa-envelope"></i>
                  </button>
                  <button className="btn btn-icon btn-link btn-danger op-8">
                    <i className="fas fa-ban"></i>
                  </button>
                </div>
                })}
          
      
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card card-round">
            <div className="card-header">
              <div className="card-head-row card-tools-still-right">
                <div className="card-title">Transaction History</div>
                <div className="card-tools">
                  <div className="dropdown">
                    <button
                      className="btn btn-icon btn-clean me-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link className="dropdown-item" to="#">Action</Link>
                      <Link className="dropdown-item" to="#">Another action</Link>
                      <Link className="dropdown-item" to="#"
                      >Something else here</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                {/* Projects table */}
                <table className="table align-items-center mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Payment Number</th>
                      <th scope="col" className="text-end">Date & Time</th>
                      <th scope="col" className="text-end">Amount</th>
                      <th scope="col" className="text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <button
                          className="btn btn-icon btn-round btn-success btn-sm me-2"
                        >
                          <i className="fa fa-check"></i>
                        </button>
                        Payment from #10231
                      </th>
                      <td className="text-end">Mar 19, 2020, 2.45pm</td>
                      <td className="text-end">$250.00</td>
                      <td className="text-end">
                        <span className="badge badge-success">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default AdminHome;
