import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Webservices from '../../../services/Webservices';
import WebAPI from '../../../services/WebAPI';

const ViewAllServices = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [myServices, setMyServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [myBusinesses, setMyBusinesses] = useState([]);

  useEffect(() => {
    loadBusiness();
  }, []);

  useEffect(() => {
    if (myBusinesses.length > 0) {
      loadServices();
    }
  }, [myBusinesses]); 

  const loadBusiness = async () => {
    setLoading(true);
    try {
      const resp = await Webservices.getAPICall(WebAPI.viewAllBusiness);
      // console.log("Businesses Response:", resp);
      
      if (resp.data.status) {
        const userBusinesses = resp.data.businesses.filter(
          (business) => business.user_id === user_data.user_id
        );
        setMyBusinesses(userBusinesses);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };
console.log("business is : ",myBusinesses);

  const loadServices = async () => {
    setLoading(true);
    try {
      const resp = await Webservices.getAPICall(WebAPI.ViewAllService);
      // console.log("Services Response:", resp);
      
      if (resp.data.status) {
        const userServices = resp.data.data.filter(
          (service) => myBusinesses.map(ele => ele.business_id == service.business_id)
        );
        setMyServices(userServices);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

console.log("service is : ",myServices);

  const searchService = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      loadServices(); 
      return;
    }

    try {
      const resp = await Webservices.getAPICall(
        `${WebAPI.searchService}?service_name=${searchTerm}`
      );
      console.log("Search Response:", resp);
      
      if (resp.data.status) {
        const userServices = resp.data.services.filter(
          (service) => myBusinesses.some(business => business.user_id === service.user_id)
        );
        setMyServices(userServices);
      } else {
        setMyServices([]);
      }
    } catch (error) {
      console.error("Error searching service:", error);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
              <h4 className="card-title">View My Services</h4>
              <div className="card-tools">
                <form onSubmit={searchService} className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-info" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              {loading ? (
                <p className="text-center my-3">Loading services...</p>
              ) : (
                <table className="table align-items-center mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col" className="text-end">Service ID</th>
                      <th scope="col" className="text-end">Service Image</th>
                      <th scope="col" className="text-end">Service Name</th>
                      <th scope="col" className="text-end">Description</th>
                      <th scope="col" className="text-end">Price</th>
                      <th scope="col" className="text-end">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myServices.length > 0 ? (
                      myServices.map((service, index) => (
                        <tr key={index}>
                          <td className="text-end">{index + 1}</td>
                          <td className="text-end">{service.service_id}</td>
                          <td className="text-end">
                            <img src={service.service_image} alt="Service" height={100} />
                          </td>
                          <td className="text-end">{service.service_name}</td>
                          <td className="text-end">{service.description}</td>
                          <td className="text-end">${service.price.toFixed(2)}</td>
                          <td className="text-end">{service.subcategory_name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No services found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllServices;
