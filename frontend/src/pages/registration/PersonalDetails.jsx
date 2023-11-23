import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { postPersonalDetails } from "../../http";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  age: "",
  gender: "",
  dob: "",
  address1: "",
  address2: "",
  city: "",
  dist: "",
  pinCode: "",
  areaCode: "",
  landLine: "",
  image: "",
  password: "",
};

const PersonalDetails = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToPost = new FormData();
    for (const key in formData) {
      if (formData[key] !== "") {
        dataToPost.append(key, formData[key]);
      }
    }

    const promise = postPersonalDetails(dataToPost);

    toast.promise(promise, {
      loading: "Saving...",
      success: (data) => {
        /* LOGIC FOR STORE */
        dispatch(setAuth(data?.data));
        // console.log(data);
        setFormData(initialState);
        return "Data saved successfully..";
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
            <h1>Personal Details</h1>
            <p className="my-4">
              Connecting Hearts, One Form at a Time: Your Journey to Forever
              Starts Here!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="formControl">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">Address1</label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Address2(Optional)</label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formControl">
                <label htmlFor="name">Disctrict</label>
                <input
                  type="text"
                  name="dist"
                  value={formData.dist}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Phone Number</label>
                <input
                  type="number"
                  value={formData.phoneNumber}
                  name="phoneNumber"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">Area Code </label>
                <input
                  type="text"
                  name="areaCode"
                  value={formData.areaCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Land Line</label>
                <input
                  type="text"
                  name="landLine"
                  value={formData.landLine}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">Profile Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formControl">
                <label htmlFor="name">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
              </div>
            </div>

            <div className="textCenter">
              <button className="btn btnPrimary my-4" type="submit">
                Submit
              </button>
            </div>
          </form>
          <p className="textCenter my-4">
            Already have an account ? <Link to="/auth">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
