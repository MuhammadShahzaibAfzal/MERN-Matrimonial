import React, { useEffect, useState } from "react";
import profile from "../../assets/noAvatar.png";
import { BASE_URL, getRegisterdUsers } from "../../http";

const RegisterdUsers = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await getRegisterdUsers();
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
      <h2 className="tableHeading">Last of Registerd Users</h2>
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
            {users?.map((i, index) => {
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

export default RegisterdUsers;
