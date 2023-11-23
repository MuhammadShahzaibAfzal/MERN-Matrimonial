import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { religions } from "../../utils/data";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { postDesiredProfileDetails } from "../../http";
import { setAuth } from "../../store/slices/authSlice";

const initialState = {
  pReligion: "",
  pEducation: "",
  cast: "",
  pMaritialStatus: "",
  pMinAge: "",
  pMaxAge: "",
  pHeight: "",
  pWeight: "",
  pFamilyType: "",
  pFood: "",
  pSmooking: "",
  pDrinking: "",
};

const DesiredProfileDetails = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = postDesiredProfileDetails(formData);

    toast.promise(promise, {
      loading: "Saving...",
      success: (data) => {
        /* LOGIC FOR STORE */
        dispatch(setAuth(data?.data));
        // console.log(data);
        setFormData(initialState);

        navigate("/");

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
            <h1>Desired Profile Details</h1>
            <p className="my-4">
              To help you find good matches tell us your prefrernces about your
              partner match
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <div className="formControl">
                <label>Prefrerred Religion</label>
                <select
                  name="pReligion"
                  value={formData.pReligion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {religions.map((i) => (
                    <option value={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div className="formControl">
                <label>Preferred Cast(Optional)</label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Preferred Maritial Status</label>
                <select
                  name="pMaritialStatus"
                  value={formData.pMaritialStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Single">Single</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Awating Divorce">Awating Divorce</option>
                </select>
              </div>

              <div className="formControl">
                <div className="formControl">
                  <label for="pEducation">Preferred Match Education:</label>
                  <select
                    id="pEducation"
                    name="pEducation"
                    required
                    value={formData.pEducation}
                    onChange={handleInputChange}
                  >
                    <option value="high_school">High School</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="phd">Ph.D.</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="weight">Preferred Weight:</label>
                <select
                  id="weight"
                  name="pWeight"
                  required
                  onChange={handleInputChange}
                  value={formData.pWeight}
                >
                  <option value="">-- Select --</option>
                  <option value="under_50kg">Under 50 kg</option>
                  <option value="50-60kg">50 - 60 kg</option>
                  <option value="60-70kg">60 - 70 kg</option>
                  <option value="70-80kg">70 - 80 kg</option>
                  <option value="80-90kg">80 - 90 kg</option>
                  <option value="90-100kg">90 - 100 kg</option>
                  <option value="over_100kg">Over 100 kg</option>
                </select>
              </div>

              <div className="formControl">
                <label for="height">Preferred Height:</label>
                <select
                  id="height"
                  name="pHeight"
                  required
                  value={formData.pHeight}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select --</option>
                  <option value="under_5ft">Under 5 feet</option>
                  <option value="5ft_0in">5 feet 0 inches</option>
                  <option value="5ft_1in">5 feet 1 inch</option>
                  <option value="5ft_2in">5 feet 2 inches</option>
                  <option value="5ft_3in">5 feet 3 inches</option>
                  <option value="5ft_4in">5 feet 4 inches</option>
                  <option value="5ft_5in">5 feet 5 inches</option>
                  <option value="5ft_6in">5 feet 6 inches</option>
                  <option value="5ft_7in">5 feet 7 inches</option>
                  <option value="5ft_8in">5 feet 8 inches</option>
                  <option value="5ft_9in">5 feet 9 inches</option>
                  <option value="5ft_10in">5 feet 10 inches</option>
                  <option value="5ft_11in">5 feet 11 inches</option>
                  <option value="6ft_0in">6 feet 0 inches</option>
                  <option value="6ft_1in">6 feet 1 inch</option>
                  <option value="6ft_2in">6 feet 2 inches</option>
                  <option value="6ft_3in">6 feet 3 inches</option>
                  <option value="6ft_4in">6 feet 4 inches</option>
                  <option value="over_6ft">Over 6 feet</option>
                </select>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="weight">Prefered Minimum Age :</label>
                <input
                  type="number"
                  value={formData.pMinAge}
                  onChange={handleInputChange}
                  name="pMinAge"
                  required
                />
              </div>

              <div className="formControl">
                <label for="weight">Prefered Maximum Age :</label>
                <input
                  type="number"
                  name="pMaxAge"
                  value={formData.pMaxAge}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="family_type">Preffered Match Family Type:</label>
                <select
                  id="family_type"
                  name="pFamilyType"
                  required
                  onChange={handleInputChange}
                  value={formData.pFamilyType}
                >
                  <option value="">-- Select --</option>
                  <option value="nuclear">Nuclear Family</option>
                  <option value="joint">Joint Family</option>
                  <option value="extended">Extended Family</option>
                  <option value="single_parent">Single Parent Family</option>
                </select>
              </div>
              <div className="formControl">
                <label for="drinking">Preferred Match Drinking:</label>
                <select
                  id="drinking"
                  name="pDrinking"
                  value={formData.pDrinking}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="never">Never</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="socially">Socially</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="smoking">Preferred Match Smoking:</label>
                <select
                  id="smoking"
                  name="pSmooking"
                  required
                  value={formData.pSmooking}
                  onChange={handleInputChange}
                >
                  <option value="">-- Select --</option>
                  <option value="never">Never</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="socially">Socially</option>
                  <option value="regularly">Regularly</option>
                </select>
              </div>

              <div className="formControl">
                <label for="food_preference">
                  Preferred Match Food Preference:
                </label>
                <select
                  id="food_preference"
                  name="pFood"
                  required
                  onChange={handleInputChange}
                  value={formData.pFood}
                >
                  <option value="">-- Select --</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
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

export default DesiredProfileDetails;
