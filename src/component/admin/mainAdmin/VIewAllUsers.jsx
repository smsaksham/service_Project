import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Webservices from "../../../services/Webservices";
import WebAPI from "../../../services/WebAPI";


const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchUserRef = useRef("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const resp = await Webservices.getAPICall(WebAPI.adminDeshbord);
      if (resp.data.status) {
        setUsers(resp.data.total_user);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const searchUser = async (event) => {
    event.preventDefault();
    const userName = searchUserRef.current.value;
    if (userName) {
      try {
        const resp = await Webservices.getAPICall(`${WebAPI.searchUser}?name=${userName}`);
        if (resp.data.status) {
          setFilteredUsers(resp.data.users);
        } else {
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        toast.error("Error searching users");
      }
    } else {
      setFilteredUsers([]);
    }
  };

  const deleteUser = async (_id) => {
    console.log("user id is ",_id);
    
    try {
      if (!_id) {
        console.error("User ID is required");
        return;
      }

      const response = await Webservices.deleteAPICall(WebAPI.deleteUser,{ "user_id":_id });
console.log("delete resp is : ",response);

      if (response.data.status) {
        toast.success("User deleted successfully");
        loadUsers();
      } else {
        toast.error("Failed to delete user: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user: " + error.message);
    }
    loadUsers()
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
        <ToastContainer autoClose={500} />
              <div className="card-title">View Users</div>
              <div className="card-tools">
                <form onSubmit={searchUser} className="form-group row">
                  <input type="text" className="form-control" ref={searchUserRef} placeholder="Search User" />
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
                    <th>S.No</th>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredUsers.length === 0 ? users : filteredUsers).map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.user_id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => deleteUser(user.user_id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;
