import React from "react";
import defaultImage from "../assets/profile.png";
import { BASE_URL, likeProfile, unLikeProfile } from "../http";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLikedProfiles } from "../store/slices/authSlice";

const ProfileCard = ({ profile }) => {
  const { likedProfiles } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLike = async (profileId) => {
    try {
      const { data } = await likeProfile(profileId);
      dispatch(setLikedProfiles(data?.likedProfiles));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleUnlike = async (profileId) => {
    try {
      const { data } = await unLikeProfile(profileId);
      console.log(data);
      dispatch(setLikedProfiles(data?.likedProfiles));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="profileCard textCenter">
      <img
        src={
          profile?.imagePath
            ? `${BASE_URL}/${profile?.imagePath}`
            : defaultImage
        }
        alt="Profile image"
      />
      <h2 className="my-4">
        {profile?.firstName} {profile?.lastName}
      </h2>
      <p>({profile?.religion})</p>
      <p>{profile?.age} years old</p>
      <div className="my-6">
        {likedProfiles?.includes(profile._id) ? (
          <button
            className="btn btnWarning"
            onClick={() => {
              handleUnlike(profile._id);
            }}
          >
            Unlike
          </button>
        ) : (
          <button
            className="btn btnPrimary"
            onClick={() => {
              handleLike(profile._id);
            }}
          >
            Like
          </button>
        )}
        <Link
          to={`/protected/single-profile/${profile._id}`}
          className="btn btnSecondary mx-4"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
