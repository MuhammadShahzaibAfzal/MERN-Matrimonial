import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/authSlice";
import { postEducationalDetails } from "../../http";

const initialState = {
  education: "",
  institute: "",
  additionalInfo: "",
  gradutionYear: "",
};

const EducationalDetails = ({ onNext }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = postEducationalDetails(formData);

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
            <h1>Educational Details</h1>
            <p className="my-4">
              Building Bridges of Education: Let Your Academic Story Unfold for
              a Lifetime of Love
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formControl">
              <label for="education">Education Level:</label>
              <select
                id="education"
                name="education"
                required
                value={formData.education}
                onChange={handleInputChange}
              >
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">Ph.D.</option>
              </select>
            </div>
            <div className="formControl">
              <label for="institute">Institution:</label>
              <input
                type="text"
                id="institute"
                name="institute"
                required
                onChange={handleInputChange}
                value={formData.institute}
              />
            </div>

            <div className="formControl">
              <label for="yearOfGraduation">Year of Graduation:</label>
              <input
                type="number"
                id="yearOfGraduation"
                name="gradutionYear"
                onChange={handleInputChange}
                value={formData.gradutionYear}
              />
            </div>

            <div className="formControl">
              <label for="additional_info">
                Additional Information(Optional):
              </label>
              <textarea
                id="additional_info"
                name="additionalInfo"
                rows="4"
                value={formData.additionalInfo}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="textCenter">
              <button className="btn btnPrimary my-4" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationalDetails;
