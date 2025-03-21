import React, { useEffect, useRef, useState } from "react";
import Webservices from "../../../services/Webservices";
import WebAPI from "../../../services/WebAPI";


const ViewSubCategory = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [msg, setMsg] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState([]);
  const searchSubCategoryName = useRef("");

  useEffect(() => {
    loadSubCategories();
  }, []);

  // Load all subcategories
  const loadSubCategories = async () => {
    var resp = await Webservices.getAPICall(WebAPI.viewAllSubCategory);
    console.log("Subcategory response:", resp);
    if (resp.data.status) {
      setSubCategoryData(resp.data.data);
      setMsg(resp.data.message);
    }
  };

  // Search subcategory
  const searchSubCategory = async (event) => {
    event.preventDefault();
    var sub_name = searchSubCategoryName.current.value;
    if (sub_name) {
      var resp = await Webservices.getAPICall(
        `${WebAPI.searchSubCategory}?sub_category_name=${sub_name}`
      );
      console.log("Search response:", resp);
      if (resp.data.status) {
        setFilterSubCategory(resp.data.subCategoryList);
      } else {
        setFilterSubCategory([]);
      }
    } else {
      setFilterSubCategory([]);
    }
  };

  const deleteSubCategory = async (subcategory_id) => {
    try {
      if (!subcategory_id) {
        console.error("Subcategory ID is required");
        return;
      }
  
      console.log("Deleting Subcategory ID:", subcategory_id);
  
      // Call API to delete subcategory
      const response = await Webservices.deleteAPICall(WebAPI.deleteSubCategory, { subcategory_id });
  
      if (response.data.status) {
        console.log("Subcategory deleted successfully");
        alert("Subcategory deleted successfully");
        // Reload or update UI
      } else {
        console.error("Failed to delete subcategory:", response.data.message);
        alert("Failed to delete subcategory: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert("Error deleting subcategory: " + error.message);
    }
    loadSubCategories();
  };
  

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
              <div className="card-title">View Subcategories</div>
              <div className="card-tools">
                <form onSubmit={searchSubCategory} className="form-group row">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Subcategory"
                    ref={searchSubCategoryName}
                  />
                  <button className="btn btn-info">Search</button>
                </form>
              </div>
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col" className="text-end">Subcategory ID</th>
                    <th scope="col" className="text-end">Subcategory Name</th>
                    <th scope="col" className="text-end">Category ID</th>
                    <th scope="col" className="text-end">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {filterSubCategory.length === 0
                    ? subCategoryData.map((sub, index) => (
                        <tr key={index}>
                          <td className="text-end">{index + 1}</td>
                          <td className="text-end">{sub.subcategory_id}</td>
                          <td className="text-end">{sub.sub_category_name}</td>
                          <td className="text-end">{sub.category_id}</td>
                          <td className="text-end">
                            <button className="btn btn-danger" onClick={()=>{
                                deleteSubCategory(sub.subcategory_id)
                            }} >Delete</button>
                          </td>
                        </tr>
                      ))
                    : filterSubCategory.map((sub, index) => (
                        <tr key={index}>
                          <td className="text-end">{index + 1}</td>
                          <td className="text-end">{sub._id}</td>
                          <td className="text-end">{sub.sub_category_name}</td>
                          <td className="text-end">{sub.category_id}</td>
                          <td className="text-end">
                            <button className="btn btn-danger" onClick={()=>{
                                deleteSubCategory(sub.subcategory_id)
                            }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubCategory;
