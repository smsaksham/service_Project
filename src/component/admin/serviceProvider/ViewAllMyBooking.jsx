import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Webservices from '../../../services/Webservices';
import WebAPI from '../../../services/WebAPI';

const ViewAllMyBooking = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const resp = await Webservices.getAPICall(WebAPI.viewAllBookings);
      console.log("Bookings Response:", resp);
      
      if (resp.data.status) {
        const userBookings = resp.data.bookings.filter(
          (booking) => booking.user_id === user_data.user_id
        );
        setBookings(userBookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
    setLoading(false);
  };

  const searchBooking = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      loadBookings();
      return;
    }
    const filteredBookings = bookings.filter((booking) =>
      booking.service_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBookings(filteredBookings);
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
              <h4 className="card-title">My Bookings</h4>
              <div className="card-tools">
                <form onSubmit={searchBooking} className="form-inline">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search booking..."
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
                <p className="text-center my-3">Loading bookings...</p>
              ) : (
                <table className="table align-items-center mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Service Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{booking.booking_id}</td>
                          <td>{booking.service_name}</td>
                          <td>{booking.date}</td>
                          <td>{booking.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">No bookings found</td>
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

export default ViewAllMyBooking;
