import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../scss/navbar.scss";
import logo from "../assets/logo-org.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../http";
import { setAuth } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import hamburger from "./../assets/hamburger.svg";
import close from "./../assets/close.svg";

const Navbar = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="center">
        {user?.isActivated && (
          <>
            <NavLink to="/protected/desired-profiles">DESIRED PROFILES</NavLink>
            <NavLink to="/protected/explore-profiles">EXPLORE PROFILES</NavLink>
            <NavLink to="/protected/liked-profiles">LIKED PROFILES</NavLink>
            <NavLink to="/protected/chats">CHATS</NavLink>
            <NavLink to="/protected/membership">MEMBERSHIP</NavLink>
            <NavLink to={`/protected/profile/${user?._id}`}>PROFILE</NavLink>
            {user?.role === "Admin" && (
              <NavLink to="/admin/dashboard">ADMIN DASHBOARD</NavLink>
            )}
          </>
        )}
      </div>
      <div className="right">
        {isAuth ? (
          <button className="btn btnSecondary" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/auth" className="btn btnSecondary">
              Login
            </Link>
            <Link to="/auth/registration" className="btn btnSecondary mx-4">
              Join Now
            </Link>
          </>
        )}
      </div>
      <div className="hamburgerIcon">
        <img
          src={hamburger}
          alt="Hamburger"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>

      <div className={`mobileMenu ${open && "mobileMenuActive"}`}>
        <p
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </p>
        {user?.isActivated && (
          <>
            <NavLink to="/protected/desired-profiles">DESIRED PROFILES</NavLink>
            <NavLink to="/protected/explore-profiles">EXPLORE PROFILES</NavLink>
            <NavLink to="/protected/liked-profiles">LIKED PROFILES</NavLink>
            <NavLink to="/protected/chats">CHATS</NavLink>
            <NavLink to="/protected/membership">MEMBERSHIP</NavLink>
            <NavLink to={`/protected/profile/${user?._id}`}>PROFILE</NavLink>
            {user?.role === "Admin" && (
              <NavLink to="/admin/dashboard">ADMIN DASHBOARD</NavLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
