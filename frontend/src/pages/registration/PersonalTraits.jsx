import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { religions } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setAuth, setLikedProfiles } from "../../store/slices/authSlice";
import { postAddtionalPersonalDetails } from "../../http";
import toast from "react-hot-toast";

const initialState = {
  religion: "",
  cast: "",
  maritialStatus: "",
  height: "",
  weight: "",
  bloodGroup: "",
  familyType: "",
  food: "",
  smooking: "",
  drinking: "",
};

const PersonalTraits = ({ onNext }) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promise = postAddtionalPersonalDetails(formData);

    toast.promise(promise, {
      loading: "Saving...",
      success: (data) => {
        /* LOGIC FOR STORE */
        dispatch(setAuth(data?.data));
        dispatch(setLikedProfiles(data?.data?.user?.likedProfiles));
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
            <h1>Additional Personal Details</h1>
            <p className="my-4">Please enter your more details</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <div className="formControl">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
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
                <label>Cast</label>
                <input
                  type="text"
                  name="cast"
                  value={formData.cast}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Maritial Status</label>
                <select
                  name="maritialStatus"
                  value={formData.maritialStatus}
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
                <label for="height">Height:</label>
                <select
                  id="height"
                  name="height"
                  required
                  value={formData.height}
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
                <label for="weight">Weight:</label>
                <select
                  id="weight"
                  name="weight"
                  required
                  onChange={handleInputChange}
                  value={formData.weight}
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
                <label for="blood_group">Blood Group:</label>
                <select
                  id="blood_group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="A_positive">A+</option>
                  <option value="A_negative">A-</option>
                  <option value="B_positive">B+</option>
                  <option value="B_negative">B-</option>
                  <option value="AB_positive">AB+</option>
                  <option value="AB_negative">AB-</option>
                  <option value="O_positive">O+</option>
                  <option value="O_negative">O-</option>
                </select>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="family_type">Family Type:</label>
                <select
                  id="family_type"
                  name="familyType"
                  required
                  onChange={handleInputChange}
                  value={formData.familyType}
                >
                  <option value="">-- Select --</option>
                  <option value="nuclear">Nuclear Family</option>
                  <option value="joint">Joint Family</option>
                  <option value="extended">Extended Family</option>
                  <option value="single_parent">Single Parent Family</option>
                </select>
              </div>
              <div className="formControl">
                <label for="drinking">Drinking:</label>
                <select
                  id="drinking"
                  name="drinking"
                  value={formData.drinking}
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
                <label for="smoking">Smoking:</label>
                <select
                  id="smoking"
                  name="smooking"
                  required
                  value={formData.smooking}
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
                <label for="food_preference">Food Preference:</label>
                <select
                  id="food_preference"
                  name="food"
                  required
                  onChange={handleInputChange}
                  value={formData.food}
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
        </div>
      </div>
    </div>
  );
};

export default PersonalTraits;
