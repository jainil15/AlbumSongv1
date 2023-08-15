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

        <FormButton
          onClick={handleRemoveClick}
          label={"Remove"}
          classNames="bg-red-500"
        />
      </div>
    </div>
  );
};

export default SongForm;
