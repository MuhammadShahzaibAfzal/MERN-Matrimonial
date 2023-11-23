import React, { useEffect, useState } from "react";
import CounterCard from "../../components/CounterCard";
import profile from "../../assets/noAvatar.png";
import { BASE_URL, getDashboardHomeData } from "../../http";

const AdminHome = () => {
  const [stats, setStats] = useState({});
  const fetchData = async () => {
    try {
      const { data } = await getDashboardHomeData();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="card__wrapper">
        <CounterCard
          heading={"Total Registerd User"}
          count={stats?.totalRegisterdUsers}
          link={"registerd-users"}
        />
        <CounterCard
          heading={"Total Free Members"}
          count={stats?.totalFreeUsers}
          link={"paid-users"}
        />
        <CounterCard
          heading={"Total Paid Members"}
          count={stats?.totalPaidUsers}
          link={"paid-users"}
        />
      </div>

      <h2 className="tableHeading">Last 5 Registerd Users</h2>
      <div className="table__wrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td>No#</td>
              <td>Profile</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Religion</td>
              <td>Maritrial Status</td>
            </tr>
          </thead>
          <tbody>
            {stats?.newRegisterdUsers?.map((i, index) => {
              return (
                <tr key={i._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        i?.imagePath ? `${BASE_URL}/${i?.imagePath}` : profile
                      }
                      alt=""
                    />
                  </td>
                  <td>{i?.firstName}</td>
                  <td>{i?.lastName}</td>
                  <td>{i?.age} years old</td>
                  <td>{i?.religion}</td>
                  <td>{i?.maritialStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="tableHeading">Last 5 Paid Users</h2>
      <div className="table__wrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td>No#</td>
              <td>Profile</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Religion</td>
              <td>Maritrial Status</td>
            </tr>
          </thead>
          <tbody>
            {stats?.newPaidUsers?.map((i, index) => {
              return (
                <tr key={i._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        i?.imagePath ? `${BASE_URL}/${i?.imagePath}` : profile
                      }
                      alt=""
                    />
                  </td>
                  <td>{i?.firstName}</td>
                  <td>{i?.lastName}</td>
                  <td>{i?.age} years old</td>
                  <td>{i?.religion}</td>
                  <td>{i?.maritialStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
