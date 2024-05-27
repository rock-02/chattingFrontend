import { Avatar, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchUser from "../../components/SearchUser/SearchUser";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UserCard from "./UserCard";
import ChatMessages from "./ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { CreateMessage, GetAllChat } from "../../redux/message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import CircularProgressWithLabel from "./Loader";

const Message = () => {
  const { message } = useSelector((store) => store);
  const auth = useSelector((store) => store.auth);
  const [currentChat, setCurrentChat] = useState();
  const [currentMessages, setCurrentMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllChat());
  }, [dispatch]);

  const handleCurrentChat = (chat) => {
    setCurrentChat(chat);
    setCurrentMessages(chat.messages);
  };

  const handleSelectImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const imageUrl = await uploadToCloudinary(file, "image");
    setSelectedImage(imageUrl);
    setLoading(false);
  };

  const handleMessageCreate = (e) => {
    if (e.key === "Enter") {
      const newMessage = {
        chatId: currentChat.id,
        data: {
          message: e.target.value,
          image: selectedImage,
        },
      };
      dispatch(CreateMessage(newMessage));

      e.target.value = ""; // Clear input field
      setSelectedImage(null); // Reset selected image
    }
  };

  useEffect(() => {
    if (message.message) {
      setCurrentMessages([...currentMessages, message.message]);
    }
  }, [message.message]);

  const getOtherUserName = (chat) => {
    const otherUser = chat.users.find((user) => user.id !== auth.user.id);
    return `${otherUser.firstName} ${otherUser.lastName}`;
  };

  return (
    <div className="h-[100vh] overflow-hidden">
      <Grid container className="h-full">
        <Grid item lg={3} xs={5} className=" overflow-y-auto hide-scrollbar">
          <div>
            <SearchUser />
          </div>
          <div className="h-full  hide-scrollbar">
            {message.chats.map((item) => (
              <div key={item.id} onClick={() => handleCurrentChat(item)}>
                <UserCard item={item} auth={auth} />
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs={7} xl={9} className="h-[100vh] overflow-hidden">
          {currentChat ? (
            <div className="flex flex-col h-[100vh] overflow-hidden">
              <div
                id="one"
                className="h-[10vh] w-full bg-slate-300 border-l-2 border-lime-400 flex justify-between items-center"
              >
                <div className="flex items-center p-4 gap-1">
                  <Avatar src="https://cdn.pixabay.com/photo/2021/03/27/19/25/alone-boy-6129399_640.jpg" />
                  <span>{getOtherUserName(currentChat)}</span>
                </div>
                <div>
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div
                id="two"
                className="flex-1 overflow-y-auto hide-scrollbar px-2 py-5 space-y-4"
              >
                {currentMessages.map((item, index) => (
                  <ChatMessages key={index} message={item} />
                ))}
              </div>
              <div
                id="three"
                className="bg-slate-400 w-full h-[10vh] flex items-center p-4"
              >
                {selectedImage && (
                  <div className="h-[5rem] w-[5rem] mr-4">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    className="w-full p-2 border-2 border-black rounded-lg"
                    type="text"
                    placeholder="Type Here ...."
                    style={{
                      borderRadius: "24px",
                    }}
                    onKeyPress={handleMessageCreate}
                  />
                </div>
                <div className="flex items-center ml-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="imageinput"
                    className="hidden"
                    onChange={handleSelectImage}
                  />
                  <label htmlFor="imageinput" style={{ cursor: "pointer" }}>
                    <IconButton component="span">
                      <AddPhotoAlternateIcon sx={{ fontSize: "3rem" }} />
                    </IconButton>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col items-center justify-center">
              <IconButton>
                <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              </IconButton>
              <p>No Chat Selected</p>
            </div>
          )}
          {loading && <CircularProgressWithLabel />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
