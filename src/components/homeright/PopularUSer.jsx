import React from "react";

import { CardHeader, Avatar, IconButton, Button } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const PopularUSer = () => {
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings"> 
            <Button size="small">Follow</Button>
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    </div>
  );
};

export default PopularUSer;
