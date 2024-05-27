import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import VideocamIcon from "@mui/icons-material/Videocam";
import ImageIcon from "@mui/icons-material/Image";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { createPostAction } from "../../redux/Post/post.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function CreatePostModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(createPostAction(values));
    },
  });

  const [selectedImage, setSelectedImage] = React.useState();
  const [selectedVideo, setSelectedVideo] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadToCloudinary(file, "image");
      setSelectedImage(imageUrl);
      formik.setFieldValue("image", imageUrl);
    }
    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      const videoUrl = await uploadToCloudinary(file, "video");
      setSelectedVideo(videoUrl);
      formik.setFieldValue("video", videoUrl);
    }
    setIsLoading(false);
  };

  const { auth } = useSelector((store) => store);

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
            <div>
              <div className="flex space-x-4 items-center">
                <Avatar />
                <div>
                  <p className="font-bold text-lg">
                    {auth?.user?.firstName + " " + auth.user?.lastName}
                  </p>
                  <p className="text-xs">
                    {"@" + auth.user?.firstName + "_" + auth.user?.lastName}
                  </p>
                </div>
              </div>
              <textarea
                placeholder="Write Description"
                name="caption"
                id="caption"
                onChange={formik.handleChange}
                value={formik.values.caption}
                rows={4}
                className="w-full mt-5 p-2 border-2 border-gray-300 rounded-md outline-none"
              ></textarea>
              <div className="flex space-x-5 items-center mt-5">
                <div>
                  <input
                    type="file"
                    name="image"
                    id="image-input"
                    accept="image/*"
                    onChange={handleSelectImage}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>
                  <span>Image</span>
                </div>
                <div>
                  <input
                    type="file"
                    name="video"
                    id="video-input"
                    accept="video/*"
                    onChange={handleSelectVideo}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="video-input">
                    <IconButton color="primary" component="span">
                      <VideocamIcon />
                    </IconButton>
                  </label>
                  <span>Video</span>
                </div>
              </div>

              {selectedImage && (
                <div>
                  <img
                    className="h-[14rem] w-[11rem]"
                    src={selectedImage}
                    alt=""
                  />
                </div>
              )}
              {selectedVideo && (
                <div>
                  <video
                    className="h-[14rem] w-[11rem]"
                    src={selectedVideo}
                    controls
                    autoPlay
                    loop
                  />
                </div>
              )}
            </div>

            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "10px" }}
              >
                Post
              </Button>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
