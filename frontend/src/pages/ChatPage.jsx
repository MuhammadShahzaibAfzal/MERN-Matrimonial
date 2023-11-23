import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components";
import Conversation from "../components/Conversation";
import "../scss/chat.scss";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getConversations, getMessages, getUser, sendMessage } from "../http";
import { io } from "socket.io-client";

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [inputText, setInputText] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();
  const [friend, setFriend] = useState({});

  const receiverId = currentConversation?.members.find(
    (member) => member !== user._id
  );

  async function handleSend(e) {
    e.preventDefault();
    try {
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: inputText,
      });
      const { data } = await sendMessage({
        conversationId: currentConversation._id,
        text: inputText,
      });
      setInputText("");
      setMessages([...messages, data?.saveMessage]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchConversations() {
    try {
      const { data } = await getConversations();
      console.log(data.conversations);
      setConversations(data?.conversations);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMessages() {
    if (!currentConversation) {
      return;
    }
    try {
      const { data } = await getMessages(currentConversation._id);
      console.log(data.messages);
      setMessages(data?.messages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [currentConversation]);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  /* ACTIVE USER GET */

  const fetchUser = async () => {
    const activeFriendId = currentConversation?.members.find(
      (m) => m !== user._id
    );
    console.log("====================================");
    console.log(activeFriendId);
    console.log("====================================");
    try {
      const { data } = await getUser(activeFriendId);
      console.log(data);
      setFriend(data?.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [currentConversation]);

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.emit("addUser", user._id);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="chatWrapper">
        <div className="conversationWrapper">
          {conversations.map((conversation) => (
            <Conversation
              conversation={conversation}
              setCurrentConversation={setCurrentConversation}
              currentConversation={currentConversation}
            />
          ))}
        </div>
        <div className="messagesWrapper">
          {currentConversation ? (
            <>
              <div className="messages">
                {messages.map((i) => (
                  <div ref={scrollRef}>
                    <Message
                      own={i.senderId === user._id}
                      message={i}
                      friend={friend}
                      currentConversation={currentConversation}
                    />
                  </div>
                ))}
              </div>
              <form className="chatBox" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Enter Message Here"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                  }}
                  required
                />
                <button className="btn btnPrimary">SEND</button>
              </form>
            </>
          ) : user?.role === "Member" ? (
            <h3 className="my-8">Open a conversation to start a chat</h3>
          ) : (
            <div className="textCenter">
              <h3 className="my-8 textCenter">
                You can't open chat.Only paid member can open chat. but you can
                still chat if someone paid memeber want to contact to you
              </h3>
              <Link className="btn btnPrimary" to="/protected/membership">
                Check Membership Plan Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
