import React, { useEffect, useState } from "react";
import UserReelCard from "./UserReelCard";
import { api } from "../../config/api";

// const reels = [1, 1, 1, 1, 1, 1];
const Reels = () => {
  const [reels, setReels] = useState([]);

  const getReels = async () => {
    const { data } = await api.get("/api/reels");
    console.log(data);
    setReels(data);
  };
  useEffect(() => {
    getReels();
  }, []);
  console.log(reels);
  return (
    <div className="py-5 px-2">
      {reels.map((item) => (
        <UserReelCard key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default Reels;
