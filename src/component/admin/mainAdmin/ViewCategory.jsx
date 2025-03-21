import React, { useEffect, useRef, useState } from 'react'
import Webservices from '../../../services/Webservices.jsx'
import WebAPI from '../../../services/WebAPI.jsx'
import { toast, ToastContainer } from 'react-toastify'

const ViewCategory = () => {
  const[C_data,setC_data] = useState([])
  const [msg,setMsg] = useState('')
  const [filterCategory,setFilterCategory] = useState([])
  var searchCategoryName = useRef('')

  useEffect(()=>{
    loadCategory();
  },[])

const loadCategory = async()=>{
  var resp = await Webservices.getAPICall(WebAPI.viewAllCategory)
  console.log("category reap",resp);
  console.log("stirng category post response : ",JSON.stringify(resp));
  if(resp.data.status)
  {
    setC_data(resp.data.categoryList)
    setMsg(resp.data.message)
  }
}

const searchCategory = async(event)=>{
  event.preventDefault()
var c_name = searchCategoryName.current.value
if(c_name){
  var resp =  await Webservices.getAPICall(`${WebAPI.searchCategory}?catagory_name=${c_name}`)
  console.log(resp);
  console.log("string resp of search category is : ",JSON.stringify(resp));
    if(resp.data.status)
  {
    setFilterCategory(resp.data.categoryList)
  }
  else{
    setFilterCategory([])
  }
}
else
{
  setFilterCategory([])

}
}

const deleteCategory = async (_id) => {
  console.log("id is : ",_id);
  
    try {
      if (!_id) {
        console.error("Subcategory ID is required");
        return;
      }
  
      console.log("Deleting Subcategory ID:", _id);
  
      // Call API to delete subcategory
      const response = await Webservices.deleteAPICall(WebAPI.DeleteCategory, { _id });
  
      if (response.data.status) {
        console.log("Subcategory deleted successfully");
        toast.success("Subcategory deleted successfully");
        // Reload or update UI
      } else {
        console.error("Failed to delete subcategory:", response.data.message);
        toast.error("Failed to delete subcategory: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast.error("Error deleting subcategory: " + error.message);
    }  
    loadCategory()
    }
  

  return<div className="container">
  <div className="page-inner">
  <div className="card card-round">
      <div className="card-header">
        <div className="card-head-row card-tools-still-right">
        <ToastContainer autoClose={500}/>
          <div className="card-title">View Category</div>
          <div className="card-tools">
            <div className=''>
            <form onSubmit={searchCategory} className='form-group row' >
              <input type="text" className='form-control' ref={searchCategoryName}/>
              <button className='btn btn-info' >search</button>
              </form>
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
                <th scope="col">S.No</th>
                <th scope="col" className="text-end">Category Id</th>
                <th scope="col" className="text-end">Category Name</th>
                <th scope="col" className="text-end">Operation</th>
              </tr>
            </thead>
            <tbody>
              {filterCategory.length == 0 ? C_data.map((cobj,index)=>{
                return<tr key={index}>
                  <td scope="col" className="text-end">{index+1}</td>
                  <td scope="col" className="text-end">{cobj._id}</td>
                  <td scope="col" className="text-end">{cobj.category_name}</td>
                  <td scope="col" className="text-end">
                    <button className='btn btn-danger' 
                      onClick={()=>{
                        deleteCategory(cobj._id)
                    }}>delete</button>
                  </td>
                </tr>
              }) : filterCategory.map((cobj,index)=>{
                return<tr key={index}>
                  <td scope="col" className="text-end">{index+1}</td>
                  <td scope="col" className="text-end">{cobj._id}</td>
                  <td scope="col" className="text-end">{cobj.category_name}</td>
                  <td scope="col" className="text-end">
                    <button className='btn btn-danger'  onClick={()=>{
                                deleteCategory(cobj._id)
                            }}>delete</button>
                  </td>
                </tr>
              })}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
}

export default ViewCategory
