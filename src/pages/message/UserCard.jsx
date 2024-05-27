import { Avatar, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const UserCard = ({ item }) => {
  const { auth } = useSelector((store) => store);
  const user =
    item.users[0].id === auth.user.id ? item.users[1] : item.users[0];

  const lastMessage =
    item.messages.length > 0
      ? item.messages[item.messages.length - 1].message
      : "message now...";

  return (
    <div className="bg-slate-100 border border-[#e7e3e3] h-[5rem] flex items-center">
      <CardHeader
        className="w-full"
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src={
              user.avatar ||
              "https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg"
            }
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={
          lastMessage.length > 20
            ? lastMessage.slice(0, 20) + "..."
            : lastMessage
        }
      />
    </div>
  );
};

export default UserCard;
