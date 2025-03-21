import React, { useEffect, useState } from 'react';
import Webservices from '../../../services/Webservices';
import WebAPI from '../../../services/WebAPI';
import { useSelector } from 'react-redux';

const ViewMyBusiness = () => {
  const user_data = useSelector((state) => state.userData.value);

  const [myBusinesses, setMyBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    setLoading(true);
    try {
      const resp = await Webservices.getAPICall(WebAPI.viewAllBusiness);
      console.log("Businesses Response:", resp);
      
      if (resp.data.status) {
        // Filter businesses belonging to the logged-in user
        const userBusinesses = resp.data.businesses.filter(
          (business) => business.user_id === user_data.user_id
        );
        setMyBusinesses(userBusinesses);
      }
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
    setLoading(false);
  };

  const searchBusiness = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      loadBusiness(); // Reset to original data if search is cleared
      return;
    }

    try {
      const resp = await Webservices.getAPICall(
        `${WebAPI.serachBusiness}?business_name=${searchTerm}`
      );
      console.log("Search Response:", resp);
      
      if (resp.data.status) {
        // Filter only the searched businesses that belong to the logged-in user
        const userBusinesses = resp.data.businesses.filter(
          (business) => business.user_id === user_data.user_id
        );
        setMyBusinesses(userBusinesses);
      } else {
        setMyBusinesses([]);
      }
    } catch (error) {
      console.error("Error searching business:", error);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
              <h4 className="card-title">View My Businesses</h4>
              <div className="card-tools">
                <form onSubmit={searchBusiness} className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search business..."
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
                <p className="text-center my-3">Loading businesses...</p>
              ) : (
                <table className="table align-items-center mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col" className="text-end">Business ID</th>
                      <th scope="col" className="text-end">Business LOGO</th>
                      <th scope="col" className="text-end">Business Name</th>
                      <th scope="col" className="text-end">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBusinesses.length > 0 ? (
                      myBusinesses.map((bobj, index) => (
                        <tr key={index}>
                          <td className="text-end">{index + 1}</td>
                          <td className="text-end">{bobj.business_id}</td>
                          <td className="text-end">
                            <img src={bobj.business_logo} alt="" height={100} />
                          </td>
                          <td className="text-end">{bobj.business_name}</td>
                          <td className="text-end">{bobj.category}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No businesses found
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

export default ViewMyBusiness;
