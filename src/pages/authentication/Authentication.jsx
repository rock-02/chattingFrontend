import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <div>
      <Grid className="h-screen overflow-hidden" container>
        <Grid item xs={7}>
          <img
            className="h-full w-full object-cover "
            src="https://cdn.pixabay.com/photo/2018/11/29/21/51/social-media-3846597_1280.png"
            alt=""
          />
        </Grid>

        <Grid item xs={5}>
          <div className="px-20 flex flex-col h-full justify-center">
            <Card className="card p-8">
              <div className="flex flex-col space-y-1">
                <h1 className="logo text-center">Media Social</h1>
                <p className="text-center text-sm w-[70&]">
                  Connecting Lives, Your Strories: Your Social World, Your Way
                </p>
              </div>

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
              {/* <Login /> */}
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
