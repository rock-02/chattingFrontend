import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { api } from "../../config/api";

const UserReelCard = ({ item }) => {
  return (
    <Card sx={{ width: "30rem", position: "relative" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item?.user?.firstName + " " + item?.user?.lastName}
        subheader={item?.user?.email}
      />
      <video
        className="w-full h-[33rem] object-cover"
        controls
        src={item?.reel}
      />
      <CardActions
        disableSpacing
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          flexDirection: "column",
        }}
      >
        <IconButton color="primary">
          {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton color="primary">
          <ShareIcon />
        </IconButton>
        <IconButton color="primary">
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton color="primary">
          {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserReelCard;
