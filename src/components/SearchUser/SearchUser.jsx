import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../redux/Auth/auth.action";
import { CreateChat } from "../../redux/message/message.action";

const SearchUser = () => {
  const [username, setUserName] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    dispatch(searchUserAction(e.target.value));
    console.log("searching auth user", auth.searchUser);
  };

  const handleClick = (item) => {
    dispatch(CreateChat(item.id))
  };

  return (
    <div>
      <div className="py-5 w-[96%] relative">
        <input
          type="text"
          className="bg-transparent border align-middle ml-2 border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search User..."
          onChange={(e) => handleSearchUser(e)}
        />
        {username && (
          <div className="absolute w-full mt-2 max-h-60 overflow-y-auto z-10 hide-scrollbar bg-white rounded-lg shadow-lg">
            {auth.searchUser.map((item) => (
              <Card
                key={item.id}
                className="w-full"
                onClick={() => handleClick(item)}
              >
                <CardHeader
                  avatar={
                    <Avatar src="https://cdn.pixabay.com/photo/2020/08/02/18/08/woman-5458225_640.png" />
                  }
                  title={item.firstName + " " + item.lastName}
                  subheader="code with zosh"
                />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
