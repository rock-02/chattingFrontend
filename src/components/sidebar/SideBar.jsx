import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SideBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth } = useSelector((store) => store);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
    logout();
  };
  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const handleGoToProfile = () => {
    setAnchorEl(null);
  };
  const handlenavigate = (item) => {
    if (item.title === "Profile") navigate(`/profile/${auth.user?.id}`);
    else if (item.title === "Message") navigate(`/message`);
    else if (item.title === "Notifications") navigate(`/notification`);
    else if (item.title === "Reels") navigate(`/reels`);
    else if (item.title === "Create Reel") navigate(`/create-reels`);
    else if (item.title === "Explore") navigate(`/explore`);
    else if (item.title === "Home") navigate(`/`);
  };

  return (
    <Card className="pl-5 card h-screen flex flex-col justify-between py-5 relative">
      <div className="space-y-8">
        <div>
          <span className="logo font-bold text-xl">Media Social</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              onClick={() => handlenavigate(item)}
              key={item.title}
              className="flex space-x-3 cursor-pointer items-center"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Divider className="my-3" />
      <div className="flex items-center justify-between pt-0">
        <div
          className="flex items-center space-x-3"
          onClick={() => navigate(`/profile/${auth.user.id}`)}
        >
          <Avatar
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt="Remy Sharp"
          />
          <div>
            <p className="font-bold">
              {" "}
              {auth.user.firstName + " " + auth.user.lastName}
            </p>
            <p className="opacity-70">
              {" "}
              {"@" + auth.user.firstName + "_" + auth.user.lastName}
            </p>
          </div>
        </div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleGoToProfile}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </Card>
  );
};

export default SideBar;
