import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Webservices from "../../services/Webservices";
import WebAPI from "../../services/WebAPI";


const UserBooking = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const resp = await Webservices.getAPICall(`${WebAPI.viewUserBookings}?user_id=${user_data.user_id}`);
      if (resp.data.status) {
        setBookings(resp.data.bookingList);
      } else {
        setMessage("No bookings found.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setMessage("Failed to load bookings.");
    }
    setLoading(false);
  };

  const handleCancelBooking = async (booking_id) => {
    try {
      const resp = await Webservices.deleteAPICall(`${WebAPI.cancelBooking}/${booking_id}`);
      if (resp.data.status) {
        setBookings(bookings.filter((booking) => booking.booking_id !== booking_id));
        setMessage("Booking canceled successfully.");
      } else {
        setMessage("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <h4 className="card-title">My Bookings</h4>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading bookings...</p>
            ) : bookings.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Booking Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td>{booking.service_name}</td>
                      <td>{booking.booking_date}</td>
                      <td>${booking.price}</td>
                      <td>{booking.status}</td>
                      <td>
                        {booking.status === "pending" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleCancelBooking(booking.booking_id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBooking;
