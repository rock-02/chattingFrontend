import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import ArticleIcon from "@mui/icons-material/Article";
import VideocamIcon from "@mui/icons-material/Videocam";
import PostCard from "../post/PostCard";
import CreatePostModal from "../createPost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../redux/Post/post.action";
import { GetSavedPostAction } from "../../redux/Auth/auth.action";

const story = [1, 1, 1, 1];
const posts = [1, 1, 0, 1, 1, 1, 1];

const MiddlePart = () => {
  const { post, auth } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handlePostCreateModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(post.posts);
  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.like]);

  return (
    <div className="px-20 overflow-x-hidden">
      <section className="p-5 flex items-center rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon sx={{ fontSize: "3rem" }} />
          </Avatar>
          <p>New</p>
        </div>
        {story?.map((item, index) => (
          <StoryCircle key={index} />
        ))}
      </section>
      <Card className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handlePostCreateModel}
            placeholder="Create New Post"
            type="text"
            className="outline-none w-[90%] rounded-full px-5 bg-transparent border-2 border-[#3b4054]"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton onClick={handlePostCreateModel}>
              <ImageIcon color="primary" />
            </IconButton>
            <span>media</span>
          </div>
          <div className="flex items-center">
            <IconButton onClick={handlePostCreateModel}>
              <ArticleIcon color="primary" />
            </IconButton>
            <span>media</span>
          </div>
          <div className="flex items-center">
            <IconButton onClick={handlePostCreateModel}>
              <VideocamIcon color="primary" />
            </IconButton>
            <span>media</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.posts?.map((item, index) => (
          <PostCard key={item.postId} item={item} />
        ))}
      </div>
      <CreatePostModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default MiddlePart;
