import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUSer from "./PopularUSer";
import { Card } from "@mui/material";

const popularUsers = [1, 1, 1, 1];
const Homeright = () => {
  return (
    <div className="pr-5">
      <SearchUser />
      <Card className="px-2">
        <div className="flex justify-between py-5 items-center">
          <p className="text-lg font-semibold">Suggestions For You</p>
          <p className="text-blue-500">See All</p>
        </div>
        <div className="">
          {popularUsers.map((item) => (
            <PopularUSer />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Homeright;
