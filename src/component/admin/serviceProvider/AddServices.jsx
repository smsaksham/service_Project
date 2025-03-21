import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webservices from "../../../services/Webservices";
import WebAPI from "../../../services/WebAPI";



const AddServices = () => {
  const [serviceName, setServiceName] = useState("");
  const [service_image, setService_image] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    loadSubcategory()
  },[])

  const loadSubcategory=async(event)=>{
    
    const resp = await Webservices.getAPICall(WebAPI.viewAllSubCategory)
    console.log("sub category",resp);
      setSubCategory(resp.data.data)
  }

  const addService = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    const serviceData = {
      business_id: businessId,
      subcategory_name : subcategoryId,
      subcategory_name : subcategoryId,
      service_name: serviceName,
      description,
      price: parseFloat(price),
      service_image,
    };
    console.log("service data  :  ",serviceData);

    try {
      const resp = await Webservices.postAPICall(WebAPI.saveService, serviceData);
      
      if (resp.data.status == "success") {
        toast.success(resp.data.message);
        setServiceName("");
        setBusinessId("");
        setSubcategoryId("");
        setPrice("");
        setDescription("");
        setService_image("")
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error("Error adding service. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="log-container">
      <div className="business-inner">
        <h2 className="text-center my-4">Add New Service</h2>
        <form onSubmit={addService}>
          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" value={businessId} onChange={(e) => setBusinessId(e.target.value)} className="form-control" placeholder="Business ID" required />
            </div>
            <div className="col-md-6 form-group">
              <select value={subcategoryId} onChange={(e)=>setSubcategoryId(e.target.value)}  className="form-control" required>
                <option value="">Select Category</option>
                {subCategory.map((subcat) => (
                  <option key={subcat.subcategory_id} value={subcat.sub_category_name}>{subcat.sub_category_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} className="form-control" placeholder="Service Name" required />
            </div>
            <div className="col-md-6 form-group">
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" required />
            </div>
          </div>
            <div className="col-md-12 form-group">
              <input type="text" value={service_image} onChange={(e) => setService_image(e.target.value)} className="form-control" placeholder="Service Image Url" required />
            </div>
          
          <div className="row">
            <div className="col-md-12 form-group">
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" rows="3" required></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <button type="submit" className="button" disabled={loading}>
                {loading ? "Adding..." : "Add Service"}
              </button>
            </div>
          </div>
        </form>

        <ToastContainer autoClose={900} />
      </div>
    </div>
  );
};

export default AddServices;
