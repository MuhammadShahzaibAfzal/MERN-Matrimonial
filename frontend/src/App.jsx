import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import {
  Activation,
  DesiredProfiles,
  ExploreProfiles,
  Home,
  Login,
  PersonalDetails,
  SingleProfile,
  LikeProfiles,
  ChatPage,
  Membership,
  Payment,
  ForgetPassword,
  NewPassword,
  Profile,
  ChangePassword,
} from "./pages";
import "./scss/global.scss";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, refreshTokens } from "./http";
import { setAuth, setLikedProfiles } from "./store/slices/authSlice";
import DashboardLayout from "./pages/dashbaord/DashboardLayout";
import AdminHome from "./pages/dashbaord/AdminHome";
import RegisterdUsers from "./pages/dashbaord/RegisterdUsers";
import PaidUsers from "./pages/dashbaord/PaidUsers";

// by default current form is Educational, after this Occupational, then Family and then DesiredProfile
// const user = {
//   isActivate: true,
//   currentForm: "Educational",
//   firstName: "Shahzaib",
//   lastName: "Afzal",
// };

const App = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(STATUSES.IDLE);

  /* refresh token request. so that user is login even it refresh the page */
  useEffect(() => {
    (async () => {
      try {
        setStatus(STATUSES.LOADING);
        const { data } = await refreshTokens();
        console.log(data);
        dispatch(setAuth(data));
        dispatch(setLikedProfiles(data?.user?.likedProfiles));
        setStatus(STATUSES.IDLE);
      } catch (error) {
        setStatus(STATUSES.ERROR);
      }
    })();
  }, []);

  if (status === STATUSES.LOADING) {
    return <h1>Loading....</h1>;
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Only Unauthorized user visit this pages  */}
        <Route path="/auth" element={<GuestRoutes />}>
          <Route index element={<Login />} />
          <Route path="registration" element={<PersonalDetails />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="new-password/:token" element={<NewPassword />} />
        </Route>

        {/* Only login user visit this pages but not activiated yet. means not completely fill details */}
        <Route path="/activated" element={<SemiProtectedRoutes />}>
          <Route index element={<Activation />} />
        </Route>

        <Route path="/protected" element={<ProtectedRoutes />}>
          <Route path="desired-profiles" element={<DesiredProfiles />} />
          <Route path="explore-profiles" element={<ExploreProfiles />} />
          <Route path="liked-profiles" element={<LikeProfiles />} />
          <Route path="single-profile/:_id" element={<SingleProfile />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="membership" element={<Membership />} />
          <Route path="payment/:planType" element={<Payment />} />
          <Route path="profile/:_id" element={<Profile />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="registerd-users" element={<RegisterdUsers />} />
            <Route path="paid-users" element={<PaidUsers />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

const GuestRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Outlet />
  ) : user?.isActivated ? (
    <Navigate to="/protected/explore-profiles" />
  ) : (
    <Navigate to="/activated" />
  );
};

const SemiProtectedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/auth" />
  ) : user?.isActivated ? (
    <Navigate to="/protected/explore-profiles" />
  ) : (
    <Outlet />
  );
};

const ProtectedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/auth" />
  ) : user?.isActivated ? (
    <Outlet />
  ) : user?.role === "Admin" ? (
    <Navigate to={"/admin/dashboard"} />
  ) : (
    <Navigate to="/activated" />
  );
};

const AdminRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  if (!isAuth || user?.role !== "Admin") {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
