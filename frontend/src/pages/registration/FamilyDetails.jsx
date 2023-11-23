import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";
import { postFamilyDetails } from "../../http";
import toast from "react-hot-toast";

const initialState = {
  fatherName: "",
  motherName: "",
  numberOfBrothers: "",
  numberOfSisters: "",
  fatherOccupation: "",
};

const FamilyDetails = ({ onNext }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = postFamilyDetails(formData);

    toast.promise(promise, {
      loading: "Saving...",
      success: (data) => {
        /* LOGIC FOR STORE */
        dispatch(setAuth(data?.data));
        // console.log(data);
        setFormData(initialState);
        onNext();
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
            <h1>Family Details</h1>
            <p className="my-4">
              Building Bonds Beyond Blood: Illuminate Your Family Canvas with Us
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label for="fatherName">Father Name:</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                required
                onChange={handleInputChange}
                value={formData.fatherName}
              />
            </div>

            <div className="formControl">
              <label for="mName">Mother Name:</label>
              <input
                type="text"
                id="mName"
                name="motherName"
                required
                onChange={handleInputChange}
                value={formData.motherName}
              />
            </div>

            <div className="formControl">
              <label for="brothers">Number of Brothers:</label>
              <input
                type="number"
                id="brothers"
                name="numberOfBrothers"
                onChange={handleInputChange}
                value={formData.numberOfBrothers}
              />
            </div>

            <div className="formControl">
              <label for="brothers">Number of Sisters:</label>
              <input
                type="number"
                id="sisters"
                name="numberOfSisters"
                onChange={handleInputChange}
                value={formData.numberOfSisters}
              />
            </div>

            <div className="formControl">
              <label for="brothers">Father Occupation:</label>
              <input
                type="text"
                id="brothers"
                name="fatherOccupation"
                onChange={handleInputChange}
                value={formData.fatherOccupation}
              />
            </div>

            <div className="textCenter">
              <button className="btn btnPrimary my-4" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FamilyDetails;
