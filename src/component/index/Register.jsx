import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import Webservices from '../../services/Webservices';
import WebAPI from '../../services/WebAPI';
const Register = () => {
  const navigate = useNavigate()

  var name = useRef()
  var email = useRef()
  var password = useRef()
  var contact = useRef()
  var gender = useRef()
  var adminId = useRef()

  var otp = useRef()
  const [isAdmin, setIsAdmin] = useState()
  const [isServiceProvider, setIsServiceProvider] = useState(false)
  const [error, setError] = useState()
  const [step, setStep] = useState('register')
  // error handel 
  const [passErr, setPassErr] = useState()
  const [contactErr, setContactErr] = useState()
  // function for api register user
  const registerUser = async (event) => {
    event.preventDefault()
    var uName = name.current.value
    var uMail = email.current.value
    var uPass = password.current.value
    var uContact = contact.current.value
    var ugender = gender.current.value
    event.preventDefault()
    if (!uName || !uMail || !uPass || !uContact || !ugender) {
      toast.warning("all fields are required..", { autoClose: 1000 })
    }
    else {
      if (isAdmin == true) {
        var adId = adminId.current.value;
        var obj = { "name": uName.trim(), "email": uMail.trim(), "password": uPass.trim(), "contact": uContact.trim(), "gender": ugender.trim(), "AdminIds": adId.trim() }
        var resp = await Webservices.postAPICall(WebAPI.registerUser, obj)
        console.log("if admin input: ", resp);
        if (resp.data.status == true) {
          toast.success("Data inserted..", { autoClose: 1000 })
          setStep("otp")
        }
      }
      if (isServiceProvider == true) {
        var obj = { "name": uName.trim(), "email": uMail.trim(), "password": uPass.trim(), "contact": uContact.trim(), "gender": ugender.trim(), "ServiceProvider":"ServiceProvider" }
        var resp = await Webservices.postAPICall(WebAPI.registerUser, obj)
        console.log("if service provider input: ", resp);
        if (resp.data.status == true) {
          toast.success("Data inserted..", { autoClose: 1000 })
          setStep("otp")
        }
      }
      else {
        var obj = { "name": uName.trim(), "email": uMail.trim(), "password": uPass.trim(), "contact": uContact.trim(), "gender": ugender.trim() }
        var resp = await Webservices.postAPICall(WebAPI.registerUser, obj)
        console.log("if user input: ", resp);
        if (resp.data.status == true) {
          toast.success("Data inserted..", { autoClose: 1000 })
          setStep("otp")
        }
        if (resp.data.error.errors.password) {
          setPassErr(resp.data.error.errors.password.message)
        }
        if (resp.data.error.errors.contact) {
          setContactErr(resp.data.error.errors.contact.message)
        }
      }
    }
  }

  const verifyOtp = async (event) => {
    event.preventDefault()
    var u_otp = otp.current.value;
    if (!u_otp) {
      toast.error("please enter otp", { autoClose: 1000 })
    }
    else {
      const resp = await Webservices.postAPICall(WebAPI.otpVerification, { "otp": u_otp.trim() })
      console.log("otp verification response :", resp);
      if (resp.data.status) {
        toast.success("otp varification successfully", { autoClose: 1000 })
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      }
      else {
        toast.error(resp.data.message, { autoClose: 1000 })
      }
    }
  }
  var checkAdmin = (event) => {
    setIsAdmin(event.target.checked);
    console.log(isAdmin);
  }
  const checkServiceProvider = (event)=>{
  event.preventDefault()
    setIsServiceProvider(true)
    console.log(isServiceProvider)
}

  return (
    <div className=''>
      {step === 'register' ? (<>
        <div className="log-container">
          <ToastContainer />
          <div className="login-container">
            <div className="login-title">
              <h1 >Register Here !</h1>
            </div>
            <form onSubmit={registerUser}>
              <div className="row form-group">
                <input type="text" className="input form-control" placeholder="Enter User Name" ref={name} />
              </div>

              <div className="row form-group">
                <input type="text" className="input form-control" placeholder="Enter User Email" ref={email} />
              </div>

              <div className="row form-group">
                <input type="text" className="input form-control" placeholder="Enter User Password" ref={password} />
                <span className='' style={{ color: "red" }}>{passErr}</span>
              </div>
              <div className="row form-group">
                <input type="text" className="input form-control" placeholder="Enter User Phone" ref={contact} />
                <span className='' style={{ color: "red" }}>{contactErr}</span>
              </div>

              <div className="row form-group">
                <select className="form-control" ref={gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className='form-check' style={{ display: "flex", gap: "4px" }}>
                <input type="checkbox" onChange={checkServiceProvider} className='' style={{ width: "23px", height: "20px" }} />
                <label htmlFor='checkbox'>check if your a Service Provider</label>
              </div>
              <div className='form-check' style={{ display: "flex", gap: "4px" }}>
                <input type="checkbox" onChange={checkAdmin} className='' style={{ width: "23px", height: "20px" }} />
                <label htmlFor='checkbox'>check if your a admin</label>
              </div>
              {isAdmin && (
                <div className="form-group">
                  <label htmlFor="adminId">Admin ID</label>
                  <input type="text" className="form-control " id="adminId" ref={adminId} placeholder="Enter Admin ID provided by the company" />
                </div>
              )}
              <br />
              <div className="row form-group">
                <input type="submit" className="btn form-control button" value="Register" onClick={() => {
                  registerUser();
                }} />
              </div>
            </form>
          </div>
        </div>

      </>) : (<>
        <div className="log-container">
          <div className="login-container">
            <div className="login-title">
              <h1 >VERIFY OTP</h1>
            </div>
            <form onSubmit={verifyOtp} >
              <div className="form-group">
                <input type="text" className="form-control" id="otp" ref={otp} placeholder="Enter the OTP sent to your email" />
              </div>
              <br />
              <button type="submit" className="btn btn-primary col-md-12">Verify OTP</button>
              {error && <span className="text-danger">{error}</span>}
            </form>
          </div>
        </div>
        <ToastContainer />
      </>
      )}
    </div>
  )
}

export default Register
