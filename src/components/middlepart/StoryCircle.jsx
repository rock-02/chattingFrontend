import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div className="flex ">
      {/* Container with horizontal scrolling */}
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sx={{ width: "5rem", height: "5rem" }}
        ></Avatar>
        <p>code with tarun</p>
      </div>
      {/* You can add more StoryCircle components here */}
    </div>
  );
};

export default StoryCircle;
