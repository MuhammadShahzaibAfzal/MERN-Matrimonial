import React from "react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { BASE_URL } from "../http";

const Message = ({ message, own, friend }) => {
  console.log(friend);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={`message ${own ? "left" : "right"}`}>
      <div className="messageTop">
        {own ? (
          <img src={`${BASE_URL}/${user?.imagePath}`} alt="Avatar" />
        ) : (
          <img src={`${BASE_URL}/${friend?.imagePath}`} alt="Avatar" />
        )}
        <div className={`${own ? "myMessage" : "otherMessage"} messageText`}>
          <span>{message.text}</span>
        </div>
      </div>
      <div className="messageBottom">
        <span>{format(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;
