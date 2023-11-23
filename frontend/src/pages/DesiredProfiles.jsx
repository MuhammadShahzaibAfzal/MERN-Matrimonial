import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import { useSelector } from "react-redux";
import { desiredProfiles } from "../http";

const DesiredProfiles = () => {
  const [profilesData, setProfilesData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const preferredData = {
    religion: user?.pReligion,
    minAge: user?.pMinAge,
    maxAge: user?.pMaxAge,
    maritialStatus: user?.pMaritialStatus,
    height: user?.pHeight,
    weight: user?.pWeight,
    smooking: user?.pSmooking,
    drinking: user?.pDrinking,
    food: user?.pFood,
  };

  const fetchProfiles = async (filters) => {
    try {
      const { data } = await desiredProfiles(filters);
      setProfilesData(data?.profiles);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles(preferredData);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="profilesWrapper">
        <div className="heading textCenter my-4">
          <h1>Desired Profile</h1>
        </div>
        {profilesData.length <= 0 ? (
          <p className="textCenter my-8 textDanger">
            No profiles match your preferences yet.
          </p>
        ) : (
          <div className="container">
            {profilesData.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DesiredProfiles;
