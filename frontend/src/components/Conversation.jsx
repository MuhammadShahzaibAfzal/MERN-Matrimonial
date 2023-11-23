import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, getUser } from "../http";

const Conversation = ({
  conversation,
  setCurrentConversation,
  currentConversation,
}) => {
  const [friend, setFriend] = useState({});
  const { user } = useSelector((state) => state.auth);
  const friendId = conversation.members.find((m) => m !== user._id);

  const fetchUser = async () => {
    try {
      const { data } = await getUser(friendId);
      // console.log(data);
      setFriend(data?.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div
      className={`conversation ${
        currentConversation?._id === conversation?._id && "activeConversation"
      }`}
      onClick={() => {
        setCurrentConversation(conversation);
      }}
    >
      <img src={`${BASE_URL}/${friend.imagePath}`} alt="Avatar" />
      <span>
        {friend?.firstName} {friend?.lastName}
      </span>
    </div>
  );
};

export default Conversation;
