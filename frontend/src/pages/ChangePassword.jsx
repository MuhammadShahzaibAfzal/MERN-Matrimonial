import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { changePassword } from "../http";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = changePassword({ newPassword, currentPassword });
    toast.promise(promise, {
      loading: "Changing.....",
      success: (data) => {
        setCurrentPassword("");
        setNewPassword("");
        return " Password Changed Successfully !";
      },
      error: (err) => {
        console.log(err);
        return err?.response?.data?.message || "Something went wrong !";
      },
    });
  };
  return (
    <div>
      <Navbar />
      <div className="formWrapper">
        <div className="formContainer">
          <div className="heading textCenter">
            <h1>Change Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label htmlFor="email">Current Password</label>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="formControl">
              <label htmlFor="email">New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="textCenter">
              <button type="submit" className="btn btnSecondary my-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
