import React, { useEffect, useState } from "react";
import { BASE_URL, getProfile, updateProfile } from "../http";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components";
import toast from "react-hot-toast";
import { religions } from "../utils/data";

const Profile = () => {
  const [formData, setFormData] = useState(null);
  const { _id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToPost = new FormData();
    for (const key in formData) {
      if (formData[key] !== "") {
        dataToPost.append(key, formData[key]);
      }
    }
    try {
      const { data } = await updateProfile(_id, dataToPost);
      console.log(data);
      setFormData(data?.user);
      toast.success("Profile updated !");
    } catch (error) {
      console.log(error);
      toast.error("Error occured !");
    }
  };
  const fetchProfile = async () => {
    try {
      const { data } = await getProfile(_id);
      setFormData(data?.profile);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="formWrapper">
        <div className="formContainer">
          <div className="heading textCenter">
            <img
              src={`${BASE_URL}/${formData?.imagePath}`}
              alt=""
              className="avatar"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h1>Welcome back! {formData?.firstName}</h1>
            <p className="my-4">
              Crafting Your Narrative, One Detail at a Time: Elevate Your
              Profile and Shine Bright
            </p>
            <div className="my-6">
              <Link
                className="btn btnSecondary"
                to={"/protected/change-password"}
              >
                Change Password
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData?.lastName}
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
                  value={formData?.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="formControl">
                <label for="education">Education Level:</label>
                <select
                  id="education"
                  name="education"
                  required
                  value={formData?.education}
                  onChange={handleInputChange}
                >
                  <option value="high_school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">Ph.D.</option>
                </select>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData?.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData?.email}
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
                  value={formData?.address1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Address2(Optional)</label>
                <input
                  type="text"
                  name="address2"
                  value={formData?.address2}
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
                  value={formData?.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="formControl">
                <label htmlFor="name">Disctrict</label>
                <input
                  type="text"
                  name="dist"
                  value={formData?.dist}
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
                  value={formData?.phoneNumber}
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
                  value={formData?.pinCode}
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
                  value={formData?.areaCode}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formControl">
                <label htmlFor="name">Land Line</label>
                <input
                  type="text"
                  name="landLine"
                  value={formData?.landLine}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label htmlFor="name">Profile Image</label>
                <input type="file" name="image" onChange={handleInputChange} />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label for="education">Occupation:</label>
                <input
                  type="text"
                  value={formData?.occupation}
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
                  value={formData?.jobTitle}
                />
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Religion</label>
                <select
                  name="religion"
                  value={formData?.religion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {religions.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <div className="formControl">
                <label>Cast</label>
                <input
                  type="text"
                  name="cast"
                  value={formData?.cast}
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
                  value={formData?.maritialStatus}
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
                  value={formData?.height}
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
                  value={formData?.weight}
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
                  value={formData?.bloodGroup}
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
                  value={formData?.familyType}
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
                  value={formData?.drinking}
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
                  value={formData?.smooking}
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
                  value={formData?.food}
                >
                  <option value="">-- Select --</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>

            <h3 className="my-4">Desired Profiles Preference</h3>

            <div className="formGroup">
              <div className="formControl">
                <label>Prefrerred Religion</label>
                <select
                  name="pReligion"
                  value={formData?.pReligion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Select --</option>
                  {religions.map((i) => (
                    <option value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="formGroup">
              <div className="formControl">
                <label>Preferred Maritial Status</label>
                <select
                  name="pMaritialStatus"
                  value={formData?.pMaritialStatus}
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
                    value={formData?.pEducation}
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
                  value={formData?.pWeight}
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
                  value={formData?.pHeight}
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
                  value={formData?.pMinAge}
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
                  value={formData?.pMaxAge}
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
                  value={formData?.pFamilyType}
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
                  value={formData?.pDrinking}
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
                  value={formData?.pSmooking}
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
                  value={formData?.pFood}
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
                Update
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

export default Profile;
