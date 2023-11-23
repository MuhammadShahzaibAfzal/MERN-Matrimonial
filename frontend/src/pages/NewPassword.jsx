import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { forgetPassword, resetPassword } from "../http";
import toast from "react-hot-toast";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords not match");
      return;
    }
    const promise = resetPassword({ newPassword: password, token });
    toast.promise(promise, {
      loading: "Changing.....",
      success: (data) => {
        // console.log(data);
        navigate("/auth");
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
            <h1>New Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="formControl">
              <label htmlFor="email">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter your confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
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
          <p className="textCenter my-4">
            Don't have an account ?{" "}
            <Link to="/auth/registration">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
