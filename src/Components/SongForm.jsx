import React, { useEffect } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import SongFile from "./SongFile";
import PreviewSong from "./PreviewSong";

const SongForm = ({
  index,
  song,
  handleChange,
  remove,
  songsChange,
  songFileName,
  songFile,
}) => {
  const handleRemoveClick = (e) => {
    remove(e, index);
    
  };
  

  return (
    <div className="flex flex-row gap-20 pl-10 border p-4 rounded-xl">
      <h2 className="flex items-center justify-center text-4xl">
        Song {index + 1}
      </h2>
      <div className="flex flex-col gap-4 items-center justify-center">
        <FormInput
          classNames={""}
          type={"text"}
          label={"Title"}
          name={"Title"}
          onChange={(e) => handleChange(e, index)}
          value={song.Title}
        />
        {/* <div className="">
          <label>Title</label>
          <input
            onChange={(e) => handleChange(e, index)}
            name={`Title`}
            type="text"
            value={song.Title}
          />
        </div> */}
        <FormInput
          classNames={""}
          type={"text"}
          label={"Artists"}
          name={"Artists"}
          onChange={(e) => handleChange(e, index)}
          value={song.Artists}
        />
        <SongFile
          onChange={(e) => songsChange(e, index)}
          label="SongFile"
          index={index}
          songFileName={songFileName}
          songFile={songFile}
        />

        {/* <div>
          <label>Artists</label>
          <input
            onChange={(e) => handleChange(e, index)}
            name={`Artists`}
            type="text"
            value={song.Artists}
          />
        </div> */}

        {/* <div>
          <label>SongFile</label>
          <input
            onChange={(e) => handleChange(e, index)}
            name={`SongFile`}
            type="text"
            value={song.SongFile}
          />
        </div> */}
        
        <FormButton onClick={handleRemoveClick} label={"Remove"} />
      </div>
    </div>
  );
};

export default SongForm;
