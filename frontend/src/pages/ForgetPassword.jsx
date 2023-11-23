import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { forgetPassword } from "../http";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isMailSend, setIsMailSend] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = forgetPassword({ email });
    toast.promise(promise, {
      loading: "Sending email....",
      success: (data) => {
        console.log(data);
        setIsMailSend(true);
        return " Email sent successfully";
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
            <h1>Forget Password</h1>
          </div>
          {isMailSend && (
            <p className="textDanger textCenter">
              Please check your mail we have sent link for password reset.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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

export default ForgetPassword;
