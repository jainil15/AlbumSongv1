import React, { useEffect, useState } from "react";
import PreviewSong from "./PreviewSong";

const SongFile = ({ onChange, label, classNames="", index, songFileName, songFile }) => {
  const [preview, setPreview] = useState("");
  const [songName, setSongName] = useState(songFileName)
  const handleSongChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  };
  

  
  

  
  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      <span className="text-xl">{label}</span>
      <label>
        <input
          type="file"
          className="none"
          style={{ display: "none", margin: "10px" }}
          // value={songFileName}
          
          onChange={(e) => {
            onChange(e);
            handleSongChange(e);
          }}
          name={label}
        />
        <span className="flex flex-row cursor-pointer">
          <span className="flex items-center p-2.5 hover:bg-gray-500 rounded-l-xl border-l-2 border-t-2 border-b-2 border-gray-400 ">
            {"Select File"}
          </span>
          <span className="flex items-center truncate text-ellipsis overflow-hidden w-72 rounded-r-xl bg-white p-1 border-r-2 border-t-2 border-b-2 text-black">
            {songFileName || "No File Selected"}
          </span>
        </span>
      </label>
      <div>{songName}</div>
      {songFileName && <PreviewSong previewFile={URL.createObjectURL(songFile)} />}
    </div>
  );
};

export default SongFile;
