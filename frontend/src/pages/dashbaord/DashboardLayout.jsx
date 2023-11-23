import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Appbar from "../../components/Appbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="dashboard__layout">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="container bg">
        <Appbar open={open} setOpen={setOpen} />
        <main className="bg text__color">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
