import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../http";
import { setAuth, setLikedProfiles } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      dispatch(setAuth(data));
      dispatch(setLikedProfiles(data?.user?.likedProfiles));
      navigate("/protected/explore-profiles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="formWrapper">
        <div className="formContainer">
          <div className="heading textCenter">
            <h1>LOGIN</h1>
          </div>
          <form onSubmit={handleLogin}>
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
            <div className="formControl">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <div className="textCenter">
              <button type="submit" className="btn btnSecondary my-4">
                LOGIN
              </button>
            </div>
          </form>
          <p className="textCenter my-4">
            Don't have an account ?{" "}
            <Link to="/auth/registration">Register Here</Link>.
          </p>
          <p className="textCenter my-4">
            Don't remember password ?{" "}
            <Link to="/auth/forget-password">Forget Password</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
