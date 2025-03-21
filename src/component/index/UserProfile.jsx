import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
    
const userData = useSelector(state=>state.userData.value)
console.log("profile data is : ",userData);

  return (
    <div className="log-container">
      <div className="business-inner text-center">
        <h2 className="my-4">User Profile</h2>
        {userData.profile_image && (
          <img
            src={userData.profile_image}
            alt="Profile"
            width="150"
            className="rounded-circle mb-3"
          />
        )}
        <h4>{userData.name}</h4>
        {/* <h4>{userData.user_name}</h4> */}
        <p>Email: {userData.email}</p>
        <p>Contact Info: {userData.contact}</p>
        <p>user_id: {userData.user_id}</p>
        <p>Gender: {userData.gender}</p>
        <p>You are: {userData.role}</p>
        <Link to="/changePassword"><button className="button"> change Password</button></Link>
        <ToastContainer autoClose={900} />
      </div>
    </div>
  );
};

export default UserProfile;
