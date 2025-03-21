import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Webservices from '../../services/Webservices';
import WebAPI from '../../services/WebAPI';
import "./ChangePassword.css"
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const user_data = useSelector((state) => state.userData.value);
    const token = user_data.token
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        
        setLoading(true);
        const oldPassword = oldPasswordRef.current.value.trim();
        const newPassword = newPasswordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            setLoading(false);
            toast.warning('All fields are required!');
            return;
        }
        
        
        if (newPassword !== confirmPassword) {
            setLoading(false);
            toast.error('New password and confirm password do not match!');
            return;
        }
        console.log("hyee");
        
        try {
            const response = await Webservices.postAPICall(WebAPI.changePassword, {token,oldPassword,newPassword,});
            console.log("change password resp is ",response);
            
            if (response.data.status) {
                toast.success('Password changed successfully!');
                   // ✅ Reset form fields
            oldPasswordRef.current.value = "";
            newPasswordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('Failed to change password');
        }

        setLoading(false);
    };

    return (
        <div className="pass-container">
            <div className="password-inner">
                <section className="">
                    <h1>Change Password</h1>
                    <form onSubmit={handleResetPassword} >
                        <div className="form-group">
                            <label htmlFor="oldPassword" className="label">Old Password</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input 
                                    type="password" 
                                    id="oldPassword" 
                                    name="oldPassword" 
                                    className="input"
                                    placeholder="Enter old password" 
                                    ref={oldPasswordRef} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword" className="label">New Password</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input 
                                    type="password" 
                                    id="newPassword" 
                                    name="newPassword" 
                                    className="input"
                                    placeholder="Enter new password" 
                                    ref={newPasswordRef} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                            <div className="input-group">
                                <FontAwesomeIcon icon={faLock} className="admin-icon" />
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    className="input"
                                    placeholder="Confirm new password" 
                                    ref={confirmPasswordRef} 
                                    required 
                                />
                            </div>
                        </div>
                        <button type="submit" className="button" disabled={loading}>
                            {loading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </form>
                    {/* <ToastContainer autoClose={2000} /> */}
                </section>
            </div>
        </div>
    );
};

export default ChangePassword;
