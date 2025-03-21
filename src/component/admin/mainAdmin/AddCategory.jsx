import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WebServices from '../../../../../../Node js/15_Complete_Project/ui/src/services/WebServices';
import WebAPI from '../../../services/WebAPI';
const AddCategory = () => {
 const [msg,setMsg] = useState('')
  const category_name = useRef()
var addCategory= async(event)=>{
  event.preventDefault()
  var c_name = category_name.current.value.trim()
   var obj = {"category_name":c_name}
    var resp = await WebServices.postAPICall(WebAPI.saveCategory,obj)
    console.log("category reap",resp);
    console.log("stirng category post response : ",JSON.stringify(resp));
    if(resp.data.status){
      setMsg(resp.data.message);
      toast.success(resp.data.message)
    }else{
      setMsg(resp.data.message);
      toast.error(resp.data.message)
    }
}
  return <div className="container">

<div className="page-inner">
<form onSubmit={addCategory}>
 <div className="row">
     <div className="col-md-12 form-group">
         <input type="text" ref={category_name} className="form-control" placeholder="Enter Category"/>
     </div>
   </div> 
   <div className="row"> 
     <div className="col-md-12 form-group">
         <input type="submit" className="btn btn-success form-control" value="Add Category"/>
     </div>
 </div>
</form>
  {msg && <span className="text-info">{msg}</span>}
  <ToastContainer autoClose={900}/>
</div>
</div>

}

export default AddCategory;
