import HomeIcon from "@mui/icons-material/Home";

import ExploreIcon from "@mui/icons-material/Explore";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
export const navigationMenu = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Reels",
    path: "/reels",
    icon: <ExploreIcon />,
  },
  {
    title: "Create Reel",
    path: "/create-reels",
    icon: <ControlPointIcon />,
  },
  {
    title: "Notifications",
    path: "/",
    icon: <NotificationsIcon />,
  },
  {
    title: "Message",
    path: "/message",
    icon: <MessageIcon />,
  },
  {
    title: "Lists",
    path: "/lists",
    icon: <ListAltIcon />,
  },
  {
    title: "Communities",
    path: "/communities",
    icon: <GroupIcon />,
  },
  {
    title: "Profile",
    path: "/profile/1",
    icon: <AccountCircleIcon />,
  },
];
