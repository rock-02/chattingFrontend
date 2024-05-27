import React from "react";
import { useSelector } from "react-redux";

const ChatMessages = ({ message }) => {
  const isImage = message.image ? true : false;
  const { auth } = useSelector((store) => store);
  const isCurrentUser = message.user.id === auth.user.id;

  return (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`p-2 ${
          isCurrentUser ? "bg-blue-500" : "bg-gray-300"
        } rounded-lg shadow-md max-w-xs md:max-w-md lg:max-w-lg`}
        style={{
          backgroundColor: isCurrentUser ? "#cfe2ff" : "#e2e3e5",
          color: isCurrentUser ? "#084298" : "#383d41",
        }}
      >
        {isImage && (
          <img
            src={message.image}
            alt=""
            className="h-[17rem] w-[15rem] object-cover rounded-md mb-2"
          />
        )}
        <p className={`text-sm ${isImage ? "py-2" : "py-1"} pr-3 pl-1`}>
          {message.message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessages;
