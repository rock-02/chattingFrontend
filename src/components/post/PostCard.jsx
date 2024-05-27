import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  getAllPostAction,
  likePostAction,
} from "../../redux/Post/post.action";
import { islikedByRequser } from "../../utils/isLikedByUser";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
const PostCard = ({ item }) => {
  const [showComment, setShowComment] = React.useState(false);
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();
  const handleComment = () => {
    const reqdata = {
      postId: item.postId,
      data: {
        content: content,
      },
    };
    console.log(reqdata);
    dispatch(createCommentAction(reqdata));
    dispatch(getAllPostAction());
  };

  const { auth } = useSelector((store) => store);
  const handleLikePost = () => {
    // setIsLiked(true);
    console.log(item.postId);
    dispatch(likePostAction(item.postId));
  };
  const navigateToProfile = useNavigate();

  const [savedPosts, setSavedPosts] = React.useState([]);
  const getSavedPosts = async () => {
    const { data } = await api.get(`posts/savedposts`);
    console.log(data);
    setSavedPosts(data);
  };

  useEffect(() => {
    getSavedPosts();
  }, []);

  const handleLikeComment = async (comment) => {
    console.log("like comment");
    const { data } = await api.put(`/api/comment/${comment.id}/like`);

    console.log(data);

    dispatch(getAllPostAction());
  };

  const handleSavePost = async () => {
    const { data } = await api.put(`/posts/save/${item.postId}/user`);

    console.log(data);

    dispatch(getAllPostAction());
  };
  const checkisSaved = () => {
    const isSaved = savedPosts.find((post) => post.postId === item.postId);
    return isSaved;
  };
  return (
    <Card className="">
      <CardHeader
        onClick={() => navigateToProfile(`/profile/${item?.user?.id}`)}
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {item?.user?.firstName[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.user?.firstName + " " + item?.user?.lastName}
        subheader={
          "@" +
          item?.user?.firstName.toLowerCase() +
          "_" +
          item?.user?.lastName.toLowerCase()
        }
      />
      <CardMedia
        component="img"
        className="object-cover"
        sx={{ height: 500 }}
        image={item?.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item?.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex justify-between">
        <div>
          <IconButton onClick={handleLikePost}>
            {islikedByRequser(auth.user.id, item) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            <span>{item.likes.length === 0 ? "" : item.likes.length}</span>
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={() => setShowComment(!showComment)}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => handleSavePost()}>
            {checkisSaved() ? (
              <BookmarkIcon sx={{ color: "blue" }} />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        </div>
      </CardActions>
      {showComment && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar />
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleComment();
                }
              }}
              placeholder="Write a comment"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full outline-none border-2 border-gray-300 rounded-full p-2"
            />
          </div>
          <Divider />
          {item?.comments.map((comment, index) => (
            <div key={comment?.id} className="mx-3 space-y-2 my-5 text-xs">
              <div className="flex justify-between items-center">
                <div
                  className="flex items-start space-x-5  px-2 py-3 border-[#4f4d4d]"
                  style={{ borderRadius: "10px" }}
                >
                  <Avatar
                    sx={{
                      height: "2.5rem",
                      width: "2.5rem",
                      fontSize: "1.2rem",
                      bgcolor: "blue",
                      fontColor: "blue",
                    }}
                  >
                    {comment?.user?.firstName[0].toUpperCase()}
                  </Avatar>
                  <div>
                    <p className="text-xs font-serif font-medium">
                      {"@" +
                        comment?.user?.firstName +
                        "_" +
                        comment?.user?.lastName}
                    </p>
                    <p className="text-sm">{comment?.content}</p>
                  </div>
                </div>
                <IconButton onClick={() => handleLikeComment(comment)}>
                  {islikedByRequser(auth.user.id, comment) ? (
                    <FavoriteIcon style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                  <span>
                    {comment.likes.length > 0 ? comment.likes.length : 0}
                  </span>
                </IconButton>
              </div>
            </div>
          ))}
        </section>
      )}
    </Card>
  );
};

export default PostCard;
