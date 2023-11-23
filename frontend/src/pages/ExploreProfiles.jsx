import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import closeIcon from "../assets/close.svg";
import { religions } from "../utils/data";
import { exploreProfiles } from "../http";

const initialState = {
  religion: "",
  minAge: 18,
  maxAge: 50,
  maritialStatus: "",
  height: "",
  weight: "",
  drinking: "",
  smooking: "",
  food: "",
};
const ExploreProfiles = () => {
  const [formData, setFormData] = useState(initialState);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [profilesData, setProfilesData] = useState([]);
  const openFilter = () => {
    setIsOpenFilter(true);
  };

  const closeFilter = () => {
    setIsOpenFilter(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchProfiles = async (filters) => {
    try {
      const { data } = await exploreProfiles(filters);
      setProfilesData(data?.profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    fetchProfiles(formData);
  };

  const clearFilter = async () => {
    setFormData(initialState);
    fetchProfiles(initialState);
  };

  useEffect(() => {
    fetchProfiles(formData);
  }, []);
  return (
    <div>
      <Navbar />
      <div className={`filterWrapper ${isOpenFilter && "filterWrapperActive"}`}>
        <div className="filterContainer">
          <img
            src={closeIcon}
            alt="close"
            className="closeIcon"
            onClick={closeFilter}
          />
          <h3>Search by Filter</h3>
          <form onSubmit={handleFilter}>
            <div className="formControl my-6">
              <label htmlFor="religion">Religion</label>
              <select
                name="religion"
                id="relgion"
                value={formData.religion}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                {religions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <p>Age</p>
            <div
              className="formGroup"
              style={{ display: "flex", columnGap: "10px" }}
            >
              <div className="formControl" style={{ width: "48%" }}>
                <input
                  type="number"
                  value={formData.minAge}
                  name="minAge"
                  onChange={handleChange}
                  placeholder="From"
                />
              </div>

              <div className="formControl" style={{ width: "48%" }}>
                <input
                  type="number"
                  value={formData.maxAge}
                  name="maxAge"
                  onChange={handleChange}
                  placeholder="To"
                />
              </div>
            </div>

            <div className="formControl">
              <label>Maritial Status</label>
              <select
                name="maritialStatus"
                value={formData.maritialStatus}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="Single">Single</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
                <option value="Awating Divorce">Awating Divorce</option>
              </select>
            </div>

            <div className="formControl">
              <label htmlFor="height">Height:</label>
              <select
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
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

            <div className="formControl">
              <label htmlFor="weight">Weight:</label>
              <select
                id="weight"
                name="weight"
                onChange={handleChange}
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
              <label htmlFor="drinking">Drinking:</label>
              <select
                id="drinking"
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="never">Never</option>
                <option value="occasionally">Occasionally</option>
                <option value="socially">Socially</option>
                <option value="regularly">Regularly</option>
              </select>
            </div>

            <div className="formControl">
              <label htmlFor="smoking">Smoking:</label>
              <select
                id="smoking"
                name="smooking"
                value={formData.smooking}
                onChange={handleChange}
              >
                <option value="">-- Select --</option>
                <option value="never">Never</option>
                <option value="occasionally">Occasionally</option>
                <option value="socially">Socially</option>
                <option value="regularly">Regularly</option>
              </select>
            </div>

            <div className="formControl">
              <label htmlFor="food_preference">Food Preference:</label>
              <select
                id="food_preference"
                name="food"
                onChange={handleChange}
                value={formData.food}
              >
                <option value="">-- Select --</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div className="flex">
              <button className="btn btnPrimary" type="submit">
                Apply Filter
              </button>
              <button
                className="btn btnSecondary mx-4 my-4"
                type="button"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="profilesWrapper">
        <div className="heading my-4 textCenter">
          <h1>Explore Profiles</h1>
        </div>
        <button
          className="btn btnSecondary"
          style={{ margin: "0 20px" }}
          onClick={openFilter}
        >
          Filter
        </button>
        <div className="container">
          {profilesData?.map((profile) => (
            <ProfileCard key={profile._id} profile={profile} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreProfiles;
