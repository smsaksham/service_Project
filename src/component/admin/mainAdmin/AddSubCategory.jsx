import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webservices from "../../../services/Webservices";
import WebAPI from "../../../services/WebAPI";


const AddSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const subcategory_name = useRef();
  const category_id = useRef();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    var resp = await Webservices.getAPICall(WebAPI.viewAllCategory);
    if (resp.data.status) {
      setCategories(resp.data.categoryList);
    }
  };

  var addSubCategory = async (event) => {
    event.preventDefault();
    var subcategory = subcategory_name.current.value.trim();
    var categoryId = category_id.current.value;

    if (!subcategory || !categoryId) {
      toast.error("Please fill all fields");
      return;
    }

    var selectedCategory = categories.find(cat => cat._id === categoryId);
    var obj = { 
      sub_category_name: subcategory,
      category_id: categoryId,
    };

    var resp = await Webservices.postAPICall(WebAPI.saveSubCategory,obj);
    if (resp.data.status) {
      setMsg(resp.data.message);
      toast.success(resp.data.message);
      subcategory_name.current.value = "";
    } else {
      setMsg(resp.data.message);
      toast.success(resp.data.message);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <form onSubmit={addSubCategory}>
          <div className="row">
            <div className="col-md-12 form-group">
              <select ref={category_id} className="form-control">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group">
              <input
                type="text"
                ref={subcategory_name}
                className="form-control"
                placeholder="Enter Subcategory"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 form-group">
              <input
                type="submit"
                className="btn btn-success form-control"
                value="Add Subcategory"
              />
            </div>
          </div>
        </form>
        {msg && <span className="text-info">{msg}</span>}
        <ToastContainer autoClose={900} />
      </div>
    </div>
  );
};

export default AddSubCategory;
