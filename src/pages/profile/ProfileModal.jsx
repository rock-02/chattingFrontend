import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/Auth/auth.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  outline: "none",
  borderRadius: 3,
  overflowY: "scroll",
  maxHeight: "80vh", // Set maximum height for scrolling
};

export default function ProfileModal({ open, handleClose }) {
  // const { auth } = useSelector((store) => store);
  // const dispatch = useDispatch();
  // const formik = useFormik({
  //   initialValues: {
  //     firstName: auth.user?.firstName || "",
  //     lastName: auth.user?.lastName || "",
  //     email: auth.user?.email || "",
  //     bio: auth.user?.bio || "",
  //     userName: auth.user?.userName || "",
  //     profilePicture: auth.user?.profilePicture || "",
  //     backgroundPicture: auth.user?.backgroundPicture || "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //     dispatch(updateProfileAction(values));
  //   },
  // });

  // const handleProfilePictureChange = (event) => {
  //   formik.setFieldValue(
  //     "profilePicture",
  //     URL.createObjectURL(event.target.files[0])
  //   );
  // };

  // const handleBackgroundPictureChange = (event) => {
  //   formik.setFieldValue(
  //     "backgroundPicture",
  //     URL.createObjectURL(event.target.files[0])
  //   );
  // };
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      // Initial form values
      firstName: auth.user?.firstName || "",
      lastName: auth.user?.lastName || "",
      email: auth.user?.email || "",
      bio: auth.user?.bio || "",
      userName: auth.user?.userName || "",
      profilePicture: auth.user?.profilePicture || "",
      backgroundPicture: auth.user?.backgroundPicture || "",
    },
    onSubmit: async (values) => {
      try {
        // Upload images to Cloudinary
        const profilePictureUrl = await uploadToCloudinary(
          values.profilePicture,
          "image"
        );
        const backgroundPictureUrl = await uploadToCloudinary(
          values.backgroundPicture,
          "image"
        );

        // Create an object with updated profile data including Cloudinary URLs
        const updatedProfileData = {
          ...values,
          profilePicture: profilePictureUrl,
          backgroundPicture: backgroundPictureUrl,
        };

        // Dispatch action to update profile
        dispatch(updateProfileAction(updatedProfileData));
      } catch (error) {
        console.error("Error uploading images to Cloudinary:", error);
      }
    },
  });

  // Function to handle profile picture change
  const handleProfilePictureChange = (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0]);
  };

  // Function to handle background picture change
  const handleBackgroundPictureChange = (event) => {
    formik.setFieldValue("backgroundPicture", event.target.files[0]);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div>
              <div className="h-[15rem] relative">
                <label
                  htmlFor="background-picture"
                  className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
                >
                  <img
                    className="w-full h-full rounded-md object-cover"
                    src={formik.values.backgroundPicture}
                    alt=""
                  />
                </label>
                <input
                  id="background-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundPictureChange}
                  className="hidden"
                />
              </div>

              <div className="pl-3 mt-3">
                <label htmlFor="profile-picture" className="cursor-pointer">
                  <Avatar
                    className="transform -translate-y-20"
                    sx={{ width: "13rem", height: "13rem" }}
                    src={formik.values.profilePicture}
                  />
                  <input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="space-y-3 mt-1 ml-0">
                <TextField
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  label="First Name"
                  id="firstName"
                />
                <TextField
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  id="lastName"
                  label="Last Name"
                />
                <TextField
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  id="email"
                  label="Email"
                />
                <TextField
                  fullWidth
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  id="bio"
                  label="Bio"
                />
                <TextField
                  fullWidth
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  id="userName"
                  label="User Name"
                />
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
