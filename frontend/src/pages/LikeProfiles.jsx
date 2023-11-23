import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import { getLikedProfile } from "../http";
import { useSelector } from "react-redux";

const LikeProfiles = () => {
  const [profilesData, setProfilesData] = useState([]);
  const { likedProfiles } = useSelector((state) => state.auth);

  const fetchProfiles = async () => {
    try {
      const { data } = await getLikedProfile();
      setProfilesData(data?.likedProfiles);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="profilesWrapper">
        <div className="heading textCenter my-4">
          <h1>Liked Profile</h1>
        </div>
        {profilesData.length <= 0 ? (
          <p className="textCenter my-4 textDanger">
            No liked profiles yet. Start exploring and find someone you like!
          </p>
        ) : (
          <div className="container">
            {profilesData.map((profile) => {
              return (
                likedProfiles.includes(profile._id) && (
                  <ProfileCard key={profile._id} profile={profile} />
                )
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LikeProfiles;
