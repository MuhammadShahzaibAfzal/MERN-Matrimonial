import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, createConversation, getProfile } from "../http";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import noAvatar from "../assets/noAvatar.png";
import toast from "react-hot-toast";

const SingleProfile = () => {
  const [profile, setProfile] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { _id } = useParams();
  const navigate = useNavigate();

  const openConversation = async () => {
    try {
      const { data } = await createConversation({
        receiverId: profile?._id,
      });
      navigate("/protected/chats");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProfile(_id);
        setProfile(data?.profile);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="singleProfileWrapper">
        <div className="imagesContainer">
          {profile.imagePath ? (
            <img src={`${BASE_URL}/${profile.imagePath}`} alt="Image" />
          ) : (
            <img src={noAvatar} alt="Image" />
          )}
        </div>

        <div className="textCenter my-6">
          <h1>
            {profile?.firstName} {profile?.lastName}
          </h1>

          {user?.role === "Member" && (
            <button
              className="btn btnSecondary my-4"
              onClick={openConversation}
            >
              Chat Now
            </button>
          )}
          <table>
            <tr>
              <th>Religion</th>
              <td>{profile?.religion}</td>
            </tr>
            <tr>
              <th>Occupation</th>
              <td>{profile.occupation}</td>
            </tr>
            <tr>
              <th>Marital Status</th>
              <td>{profile.maritialStatus}</td>
            </tr>

            <tr>
              <th>Age</th>
              <td>{profile.age}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                {user?.role === "Member"
                  ? profile?.email
                  : "You have to be a paid member in order to see email "}
              </td>
            </tr>

            <tr>
              <th>Contact Number</th>
              <td>
                {user?.role === "Member"
                  ? profile?.phoneNumber
                  : "You have to be a paid member in order to see contact number "}
              </td>
            </tr>

            <tr>
              <th>Address</th>
              <td>{profile?.address1}</td>
            </tr>

            <tr>
              <th>City</th>
              <td>{profile?.city}</td>
            </tr>

            <tr>
              <th>Education</th>
              <td>{profile.education}</td>
            </tr>

            <tr>
              <th>Drinking</th>
              <td>{profile.drinking}</td>
            </tr>

            <tr>
              <th>Drinking</th>
              <td>{profile.drinking}</td>
            </tr>

            <tr>
              <th>Smooking</th>
              <td>{profile.smooking}</td>
            </tr>

            <tr>
              <th>Food</th>
              <td>{profile.food}</td>
            </tr>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProfile;
