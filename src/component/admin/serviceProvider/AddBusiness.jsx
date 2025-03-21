import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebAPI from "../../../services/WebAPI";
import Webservices from "../../../services/Webservices";
import { useSelector } from "react-redux";

const AddBusiness = () => {
  const user_data = useSelector((state) => state.userData.value);

  const businessName = useRef()
  const ownerName = useRef()
  const userId = useRef()
  const email = useRef()
  const contactInfo = useRef()
  const address = useRef()
  const category  = useRef()
  const regNumber  = useRef()
  const description = useRef()
  const image_name = useRef();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const resp = await Webservices.getAPICall(WebAPI.viewAllCategory);
      setCategories(resp.data.categoryList || []);
    } catch (error) {
      console.error("Error loading categories", error);
      toast.error("Failed to load categories");
    }
  };

  const addBusiness = async (event) => {
    event.preventDefault()
    if (loading) return; // Prevent multiple submissions
    var b_name = businessName.current.value
    var o_name = ownerName.current.value
    var u_id = user_data.user_id
    var email_user = email.current.value
    var contact_info = contactInfo.current.value
    var add_res = address.current.value
    var cat_name = category.current.value
    var reg = regNumber.current.value
    var des_cription = description.current.value
    var img_name = image_name.current.value
//     console.log(b_name);
    
//     setLoading(true);
//     var f_data = new FormData()
//     f_data.append("business_name", b_name);
//     f_data.append("owner_name",o_name );
//     f_data.append("user_id", u_id );
//     f_data.append("email", email.current.value);
//     f_data.append("contact_info", contactInfo.current.value);
//     f_data.append("address", );
//     f_data.append("category", );
//     f_data.append("registration_number", );
//     f_data.append("description", );
//     if (image) {
//       f_data.append("business_logo", image);
//       console.log(image);
      
//     }
// console.log("form data is :",f_data);
var f_data = {
  "business_name":b_name,
  "owner_name": o_name,
  "user_id": u_id,
  "email": email_user,
  "contact_info": contact_info,
  "address": add_res,
  "category": cat_name,
  "registration_number": reg,
  "description": des_cription,
  "business_logo": img_name
}
 console.log(f_data);
 
    try {
      const resp = await Webservices.postAPICall(WebAPI.saveBusiness,f_data)
      console.log("resp is : ",resp);
      
      if (resp.data.status) {
        toast.success(resp.data.message);
        businessName.current.value = ""
        ownerName.current.value = ""
        userId.current.value = ""
        email.current.value = ""
        contactInfo.current.value = ""
        address.current.value = ""
        category.current.value = ""
        regNumber.current.value = ""
        description.current.value = ""
        setImage(null);
      } else {
        // toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error("Error adding business. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="pass-container">
      <div className="business-inner">
        <h2 className="text-center my-4">Add New Business</h2>
        <form onSubmit={addBusiness} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" ref={businessName}  className="form-control" placeholder="Business Name" required />
            </div>
            <div className="col-md-6 form-group">
              <input type="text" ref={ownerName}  className="form-control" placeholder="Owner Name" required />
            </div>
          </div>

        
            <div className="col-md-12 form-group">
              <input type="email" ref={email}  className="form-control" placeholder="Email" required />
            </div>


          <div className="row">
            <div className="col-md-6 form-group">
              <input type="text" ref={contactInfo}  className="form-control" placeholder="Contact Info" required />
            </div>
            <div className="col-md-6 form-group">
              <input type="text" ref={address}  className="form-control" placeholder="Address" required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <select ref={category}  className="form-control" required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 form-group">
              <input type="text" ref={regNumber}  className="form-control" placeholder="Registration Number" required />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <textarea ref={description}  className="form-control" placeholder="Description" rows="3" required></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <input type="text" className="form-control" placeholder="Enter Business Logo image address" ref={image_name} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 form-group">
              <button type="submit" className="button " disabled={loading}>
                {loading ? "Adding..." : "Add Business"}
              </button>
            </div>
          </div>
        </form>

        <ToastContainer autoClose={900} />
      </div>
    </div>
  );
};

 export default AddBusiness;

