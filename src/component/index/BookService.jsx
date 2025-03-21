import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Webservices from "../../services/Webservices";
import WebAPI from "../../services/WebAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookService = () => {
  const user_data = useSelector((state) => state.userData.value);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const resp = await Webservices.getAPICall(WebAPI.ViewAllService);
      if (resp.data.status) {
        setServices(resp.data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    const selected = services.find((service) => service.service_id === parseInt(serviceId));
    setSelectedService(selected);
    setPrice(selected ? selected.price : 0);
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    if (!selectedService || !bookingDate) {
      setMessage("Please select a service and date.");
      return;
    }
console.log("selected service ",selectedService.business_id
    );
console.log("selected user id  ",user_data.user_id);

    const bookingData = {
      user_id: user_data.user_id,
      business_id: selectedService.business_id,
      service_id: selectedService.service_id,
      service_name: selectedService.service_name,
      booking_date: bookingDate,
      price: selectedService.price,
      status: "pending",
    };

    setLoading(true);
    try {
      const resp = await Webservices.postAPICall(WebAPI.saveBooking,bookingData);
      if (resp.data.status) {
        toast.success("Booking successful .")
        setMessage("Booking successful!");
      } else {
        setMessage("Booking failed. Try again.");
        toast.error("Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      setMessage("An error occurred.");
      toast.error("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="log-container">
                <ToastContainer autoClose={900} />
      <div className="business-inner">
        <div className="card card-round">
          <div className="card-header">
            <h4 className="card-title">Book a Service</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label>Select Service</label>
                <select className="form-control" onChange={handleServiceChange}>
                  <option value="">-- Select Service --</option>
                  {services.map((service) => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.service_name} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Booking Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input type="text" className="form-control" value={`$${price}`} disabled />
              </div>

              {message && <p className="text-info">{message}</p>}

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
