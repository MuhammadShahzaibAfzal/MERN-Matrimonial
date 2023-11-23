import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../http";
import { setAuth } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const Home = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      dispatch(setAuth(data));
      navigate("/protected/explore-profiles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="hero">
        <div className={`left ${isAuth && "textCenter"}`}>
          <h1 className="">Embark on Your Journey to Everlasting Love</h1>
          <h2>
            Connecting Hearts, Creating Stories: Find Your Perfect Match Today
          </h2>
          <p>
            Unlock a world of matches! Log in or register now to explore
            profiles and connect with potential partners who share your
            interests and values.
          </p>

          {isAuth && !user?.isActivated && (
            <div className="textCenter my-8">
              <Link
                to="/activated"
                className="btn btnSecondary"
                style={{ width: "140px" }}
              >
                Please Complete Profile
              </Link>
            </div>
          )}
        </div>
        {!isAuth && (
          <div className="right">
            <div className="heading textCenter">
              <h1>Login</h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="formControl">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="formControl">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="textCenter">
                <button className="btn btnSecondary my-4" type="submit">
                  LOGIN
                </button>
              </div>

              <p className="textCenter my-4">
                Don't have an account ?{" "}
                <Link to="/auth/registration">Register Now !</Link>{" "}
              </p>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
