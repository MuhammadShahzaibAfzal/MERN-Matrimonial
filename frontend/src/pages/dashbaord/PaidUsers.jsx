import React, { useEffect, useState } from "react";
import profile from "../../assets/noAvatar.png";
import { BASE_URL, getPaidUsers } from "../../http";
import moment from "moment/moment";

const PaidUsers = () => {
  const [users, setUsers] = useState(null);
  const fetchData = async () => {
    try {
      const { data } = await getPaidUsers();
      setUsers(data?.users);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2 className="tableHeading">List of Paid Users</h2>
      <div className="table__wrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <td>No#</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Plan</td>
              <td>Start Date</td>
              <td>End Date</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {users?.map((i, index) => {
              return (
                <tr key={i._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={
                        i?.userId?.imagePath
                          ? `${BASE_URL}/${i?.userId?.imagePath}`
                          : profile
                      }
                      alt=""
                    />
                  </td>
                  <td>
                    {i?.userId?.firstName}
                    {i?.userId?.lastName}{" "}
                  </td>
                  <td>{i?.plan}</td>
                  <td>{moment(i?.startDate).format("DD MMM YYYY")}</td>
                  <td>{moment(i?.endDate).format("DD MMM YYYY")}</td>
                  <td style={{ textTransform: "capitalize" }}>{i?.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaidUsers;
