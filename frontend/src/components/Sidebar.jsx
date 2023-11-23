import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../store/slices/authSlice";
import { BASE_URL, logout } from "../http";
import profileImage from "../assets/noAvatar.png";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`sidebar  ${open && "sidebar__active"}`}>
      <div className="sidebar__content">
        {/* close button */}
        <button
          className="btn__close"
          onClick={() => {
            setOpen(!open);
          }}
        >
          &times;
        </button>
        <div className="user-info">
          <img
            src={
              user.imagePath ? `${BASE_URL}/${user.imagePath}` : profileImage
            }
            alt="Profile Image"
          />
          <span className="username">{user?.firstName}</span>
          <span className="role">({user.role})</span>
        </div>
        <div className="list">
          <NavLink to={"/admin/dashboard"} className="list__item ">
            {/* <span className="icon">icon</span> */}
            <span className="text">Dashboard</span>
          </NavLink>
          <NavLink
            to={"/admin/dashboard/registerd-users"}
            className="list__item "
          >
            {/* <span className="icon">icon</span> */}
            <span className="text">Registerd Users</span>
          </NavLink>
          <NavLink to={"/admin/dashboard/paid-users"} className="list__item ">
            {/* <span className="icon">icon</span> */}
            <span className="text">Paid Users</span>
          </NavLink>
          <NavLink to="#" className="list__item" onClick={handleLogout}>
            <span className="text">Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
