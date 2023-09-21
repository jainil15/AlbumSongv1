import React from "react";

const MusicPlayer = ({ songFile, className = "" }) => {
  return (
    <div>
      <div className="bg-yellow-400 w-[30rem] h-[10rem] rounded-2xl">
        <div className="w-100">
          <input type="range" className="w-[90%] h-1 bg-black rounded-md slider" />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
