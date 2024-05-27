import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/post/PostCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { api } from "../../config/api";
import UserReelCard from "../../components/reels/UserReelCard";

const tabs = [
  { value: "post", label: "Posts" },
  { value: "reels", label: "Reels" },
];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { post, auth } = useSelector((store) => store);
  const [value, setValue] = useState("post");
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUser = async () => {
    const { data } = await api.get(`/api/users/${id}`);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  const [userReels, setReels] = useState([]);

  const getReelsByUserId = async () => {
    const { data } = await api.get(`/api/reels/user/${id}`);
    setReels(data);

    console.log("data", data);
    console.log("userReels", userReels);
  };

  useEffect(() => {
    getReelsByUserId();
  }, [id]);
  const getSavedPosts = async () => {
    const { data } = await api.get("/posts/savedposts");

    setSavedPosts(data);
  };

  useEffect(() => {
    getSavedPosts();
  }, [id]);

  const getUserPosts = async () => {
    const { data } = await api.get(`/api/posts/users/${id}`);
    setUserPosts(data);
  };

  useEffect(() => {
    getUserPosts();
  }, [id]);

  const handleFollow = async () => {
    if (!user) return; // Ensure user is not null
    const { data } = await api.get(`/api/users/follow/${user.id}`);
    getUser();
    console.log(data);
    auth.user.following.push(user);
  };

  const isfollow = () => {
    if (!user) return false; // Ensure user is not null
    return (
      auth.user?.following?.includes(user.id) ||
      user?.followers?.includes(auth.user.id)
    );
  };

  return (
    <Card className="py-10 w-[70%]">
      {user && (
        <div className="rounded-md">
          <div className="h-[15rem]">
            <img
              className="h-full w-full object-cover rounded-t-md"
              src={
                auth.user.backgroundPicture ||
                "https://cdn.pixabay.com/photo/2023/01/13/14/58/snake-7716269_640.jpg"
              }
              alt=""
            />
          </div>

          <div className="px-5 flex justify-between items-start mt-5 h-[5rem]">
            <Avatar
              className="transform -translate-y-24"
              sx={{ height: "10rem", width: "10rem" }}
              src={
                auth.user.profilePicture ||
                "https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_1280.jpg"
              }
            />

            {auth.user.id == id ? (
              <Button
                sx={{ borderRadius: "20px" }}
                variant="contained"
                color="primary"
                onClick={handleOpenProfileModal}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                sx={{ borderRadius: "20px" }}
                variant="contained"
                color="primary"
                onClick={handleFollow}
              >
                {isfollow() ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className="p-5">
            <div>
              <h1 className="text-xl font-bold">
                {auth.user.id == id
                  ? `${auth.user.firstName} ${auth.user.lastName}`
                  : `${user.firstName} ${user.lastName}`}
              </h1>
              <p className="text-gray-500">
                {auth.user.id == id
                  ? `${"@" + auth.user.firstName} ${auth.user.lastName + "_"}`
                  : `${"@" + user.firstName + "_"} ${user.lastName}`}
              </p>
            </div>

            <div className="flex gap-3">
              <span>{userPosts.length} posts</span>
              <span>{user.followers.length} followers</span>
              <span>{user.following.length} following</span>
            </div>
            <div className="mt-2">
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
      )}

      <section>
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
            {tabs.map((tab) => {
              return (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              );
            })}
            {auth.user?.id === user?.id && (
              <Tab key={"saved"} value={"saved"} label={"Saved"} />
            )}
          </Tabs>
        </Box>

        <div className="flex justify-center">
          {value === "post" && (
            <div className="space-y-5 w-[70%] my-10">
              {userPosts.length === 0 ? (
                <p>No posts</p>
              ) : (
                userPosts.map((item) => (
                  <PostCard key={item.postId} item={item} />
                ))
              )}
            </div>
          )}
          {value === "saved" && (
            <div className="space-y-5 w-[70%] my-10">
              {savedPosts.length === 0 ? (
                <p>No saved posts</p>
              ) : (
                savedPosts.map((item) => (
                  <PostCard key={item.postId} item={item} />
                ))
              )}
            </div>
          )}
          {value === "reels" && (
            <div className="space-y-5 w-[70%] my-10">
              {userReels.length === 0 ? (
                <p>
                  No Reels{" "}
                  <span onClick={() => navigate("/create-reels")}>
                    Create Reels
                  </span>
                </p>
              ) : (
                userReels.map((item) => (
                  <UserReelCard key={item.reelId} item={item} />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  );
};

export default Profile;
