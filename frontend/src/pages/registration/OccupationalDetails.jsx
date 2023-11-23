import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { setAuth } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { postOccupationalDetails } from "../../http";

const initialState = {
  occupation: "",
  jobTitle: "",
  responsibilities: "",
  yearsOfExperience: "",
};

const OccupationalDetails = ({ onNext }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = postOccupationalDetails(formData);

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
            <h1>Occuptional Details</h1>
            <p className="my-4">
              Unveil Your Professional Journey: Share Your Occupational Details
              and Let Your Career Story Shine.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label for="education">Occupation:</label>
              <input
                type="text"
                value={formData.occupation}
                name="occupation"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formControl">
              <label for="institute">Job Title:</label>
              <input
                type="text"
                id="institute"
                name="jobTitle"
                required
                onChange={handleInputChange}
                value={formData.jobTitle}
              />
            </div>

            <div className="formControl">
              <label for="yearOfGraduation">Responsibilties:</label>
              <textarea
                type="number"
                id="yearOfGraduation"
                name="responsibilities"
                onChange={handleInputChange}
                value={formData.responsibilities}
                rows={4}
              />
            </div>

            <div className="formControl">
              <label for="yearsOfExperience">Years of Experience:</label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
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

export default OccupationalDetails;
