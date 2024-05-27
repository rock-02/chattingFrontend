import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../config/api";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const CreateReelsForm = () => {
  const [title, setTitle] = useState("");
  const [reel, setReel] = useState(null); // Change to null initially
  const [videoPreview, setVideoPreview] = useState(""); // For video preview
  const { auth } = useSelector((store) => store); // Assuming user is stored in auth.user
  const dispatch = useDispatch();

  const handleReelChange = (event) => {
    setReel(event.target.files[0]); // Update reel state with the selected file
    setVideoPreview(URL.createObjectURL(event.target.files[0])); // Set video preview URL
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !reel) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Upload reel to Cloudinary and get video URL
      const videoUrl = await uploadToCloudinary(reel, "video");

      // Send video URL along with title to backend
      const reqdata = {
        title: title,
        reel: videoUrl,
      };

      const { data } = await api.post("/api/reels", reqdata);
      console.log("Reel created successfully", data);

      setReel(null);
      setVideoPreview(null);

      setTitle(null);
      // Dispatch an action or update state as needed
    } catch (error) {
      console.error("Error creating reel", error);
    }
  };

  return (
    <Card sx={{ height: "42rem", padding: "1rem", marginTop: "1rem" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create a Reel
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="16px"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
              maxWidth: "400px",
            }}
          >
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <input
                accept="video/*"
                type="file"
                onChange={handleReelChange}
                style={{ display: "none" }}
                id="reel-upload"
              />
              <label htmlFor="reel-upload">
                <Button variant="contained" color="primary" component="span">
                  Upload Reel
                </Button>
              </label>
              {reel && <Typography variant="body2">{reel.name}</Typography>}
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Box>
          {videoPreview && (
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="subtitle1" gutterBottom>
                Video Preview:
              </Typography>
              <video
                controls
                src={videoPreview}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateReelsForm;
