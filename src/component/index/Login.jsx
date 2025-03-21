
import React, { useRef, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import WebAPI from '../../services/WebAPI'
import Webservices from '../../services/Webservices'
import { checkUserStatus } from '../../redux/Slice'
import { useDispatch } from 'react-redux'

const Login = () => {
    const email = useRef()
    const password = useRef()
    const [msg, setMsg] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginUser = async (event) => {
        event.preventDefault()
        var em = email.current.value;
        var pass = password.current.value;
        var obj = { "email": em, "password": pass };
        //passing obj to api and wait for response 
        var response = await Webservices.postAPICall(WebAPI.loginUser, obj)

        console.log("login in resp is : ", response);
        
        if (response.data.status) {
            var info = { ...response.data.user, token: response.data.token, isLoginStatus: true }
            dispatch(checkUserStatus(info))
            if (response.data.user.role == "User") {
                navigate("/")
            }
            if (response.data.user.role == "Admin"||response.data.user.role == "ServiceProvider") {
                navigate("/adminHome")
            }

        }
        else {
            toast.error("invalid login !", { autoClose: 1000 })
        }
    }


    return <div className="log-container">
        <ToastContainer />
        <div className="login-container">
            <div className="row text-center ">
                <h1 className="login-title">Login Here !</h1>
            </div>
            <form onSubmit={(event) => {
                loginUser(event);
            }
            } >
                <div className="form-group">
                    <label htmlFor="email" className="label">Email Address</label>
                    <div className="input-group">
                        <div className='admin-icon'> <FontAwesomeIcon icon={faUser} /></div>
                        <input type="email" id="email" name="email" className="input" placeholder="Enter your email" ref={email} required />
                    </div>
                    <div className="error" id="emailError">Please enter a valid email address</div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <div className="input-group">
                        <div className='admin-icon'> <FontAwesomeIcon icon={faLock} /></div>
                        <input type="password" id="password" className="input" name="password" placeholder="Enter your password" ref={password} required />
                    </div>
                    <div className="error" id="passwordError">Password must be at least 6 characters</div>
                </div>
                <button type="submit" className="button">
                    <i className="fas fa-sign-in-alt"></i> Sign In
                </button>
            </form>
            <span style={{ color: 'red' }}>{msg}</span>
            <br />
            <span>If You Have Not Register ? <Link to="/register">Click Here !</Link></span><br />
            <span><Link to="/forgetPassword">Forget Password</Link></span>
            <br />
        </div>
    </div>
}

export default Login
