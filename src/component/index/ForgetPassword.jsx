import React, { useRef, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebAPI from "../../services/WebAPI";
import Webservices from "../../services/Webservices";

const ForgetPassword = () => {
    const emailRef = useRef();
    const otpRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState("");

    // 1. Send OTP to Email
    const handleSendOtp = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;

        try {
            const response = await Webservices.postAPICall(WebAPI.emailVerification,{ email });
            console.log("email verification ",response);
            
            if (response.data.status) {
                toast.success("OTP sent to your email", { autoClose: 1000 });
                setEmail(email);
                setStep(2);
            } else {
                toast.error("Email not found", { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Error sending OTP", { autoClose: 1000 });
        }
    };

    // 2. Verify OTP
    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        const otp = otpRef.current.value;

        try {
            const response = await Webservices.postAPICall(WebAPI.otpVerification, { email, otp });
            console.log("otp verification ",response);
            
            if (response.data.status) {
                toast.success("OTP Verified!", { autoClose: 1000 });
                setStep(3);
            } else {
                toast.error("Invalid OTP", { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Error verifying OTP", { autoClose: 1000 });
        }
    };

    // 3. Reset Password
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!", { autoClose: 1000 });
            return;
        }

        try {
            const response = await Webservices.postAPICall(WebAPI.forgetPassword, { email, newPassword });
            console.log("password change ",response); 
            if (response.data.status) {
                toast.success("Password Reset Successful!", { autoClose: 1000 });
                navigate("/login");
            } else {
                toast.error("Error resetting password", { autoClose: 1000 });
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 1000 });
        }
    };

    return (
        <div className="log-container">
            <ToastContainer />
            <div className="login-container">
                <div className="row text-center">
                    <h1 className="login-title">Forget Password</h1>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOtp}>
                        <div className="form-group">
                            <label htmlFor="email" className="label">Email Address</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faUser} className="admin-icon" />
                                <input type="email" id="email" name="email" className="input"
                                    placeholder="Enter your email" ref={emailRef} required />
                            </div>
                        </div>
                        <button type="submit" className="button">Send OTP</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>
                        <div className="form-group">
                            <label htmlFor="otp" className="label">Enter OTP</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input type="number" id="otp" className="input"
                                    name="otp" placeholder="Enter OTP sent to your email"
                                    ref={otpRef} required />
                            </div>
                        </div>
                        <button type="submit" className="button">Verify OTP</button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
                            <label htmlFor="newPassword" className="label">New Password</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input type="password" id="newPassword" name="newPassword" className="input"
                                    placeholder="Enter new password" ref={newPasswordRef} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input type="password" id="confirmPassword" name="confirmPassword" className="input"
                                    placeholder="Confirm new password" ref={confirmPasswordRef} required />
                            </div>
                        </div>
                        <button type="submit" className="button">Reset Password</button>
                    </form>
                )}

                <br />
                <span>Return to login <Link to="/login">Click Here!</Link></span><br />
                <br />
            </div>
        </div>
    );
};

export default ForgetPassword;
