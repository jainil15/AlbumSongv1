import React from "react";
import { useState } from "react";
import axios from "axios";
import SongForm from "../Components/SongForm";
import FormInput from "../Components/FormInput";
import FormButton from "../Components/FormButton";
import FormFileInput from "../Components/FormFileInput";
import ShowErrors from "../Components/ShowErrors";
import PreviewSong from "../Components/PreviewSong";

function CreateAlbum() {
  const [formValues, setFormValues] = useState({
    Artist: "",
    Title: "",
    Songs: [
      {
        Artists: "",
        Title: "",
      },
    ],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [errors, setErrors] = useState([]);
  const [songFiles, setSongFiles] = useState([""]);
  const [songFileNames, setSongFileNames] = useState([""]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.value);
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Artist", formValues.Artist);
    formData.append("Title", formValues.Title);
    if (selectedFile) {
      formData.append("AlbumImage", selectedFile);
    }
    formValues.Songs.forEach((song, index) => {
      formData.append(`Songs[${index}].Title`, song.Title);
      formData.append(`Songs[${index}].Artists`, song.Artists);
      if (songFiles[index]) {
        formData.append(`Songs[${index}].SongFile`, songFiles[index]);
      }
    });
    try {
      const res = await axios.post("/album", formData);
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleSongChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSongs = [...formValues.Songs];
    updatedSongs[index] = { ...updatedSongs[index], [name]: value };

    setFormValues((prev) => ({ ...prev, Songs: updatedSongs }));
  };

  const handleAddSongs = (e) => {
    e.preventDefault();
    setFormValues((prev) => ({
      ...prev,
      Songs: [...prev.Songs, { Title: "", Artists: "", SongFile: "" }],
    }));
  };

  const handleRemoveSong = (e, index) => {
    e.preventDefault();

    //console.log(updatedSongs);
    const updatedSongs = formValues.Songs.filter((_, i) => i !== index);
    setFormValues((prev) => ({ ...prev, Songs: updatedSongs }));

    const updatedSongFileNames = songFileNames.filter((_, i) => i !== index);
    setSongFileNames((prev) => updatedSongFileNames);

    const updateSongFiles = songFiles.filter((_, i) => i !== index);
    setSongFiles(updateSongFiles);
  };

  const handleSongFileChange = (e, index) => {
    const newSongFiles = [...songFiles];
    newSongFiles[index] = e.target.files[0];

    const newSongFileNames = [...songFileNames];
    newSongFileNames[index] = e.target.value;
    setSongFileNames(newSongFileNames);
    setSongFiles(newSongFiles);
  };

  return (
    <div className="bg-slate-950 text-white flex flex-col justify-center items-center gap-1 p-10 border">
      <h1 className="text-6xl flex flex-col items-center justify-center">
        Add Album
      </h1>
      <ShowErrors errorsMessages={errors} />
      <div className="">
        <form encType="multipart/form-data">
          <div className="flex flex-col gap-4 items-center">
            <FormInput
              classNames={""}
              type={"text"}
              label={"Artist"}
              name={"Artist"}
              onChange={handleChange}
              value={formValues.Artist}
            />

            <FormInput
              classNames={""}
              type={"text"}
              label={"Title"}
              name={"Title"}
              onChange={handleChange}
              value={formValues.Title}
            />

            {/* <div>
              <label className="flex flex-col items-center justify-center gap-1">
                AlbumImage
              </label>
              <input
                onChange={handleFileChange}
                name="AlbumImage"
                type="file"
              /> */}
            <FormFileInput
              label={"Select File"}
              onChange={handleFileChange}
              selectFile={imageName}
              classNames={""}
            />
            {imagePreview && ( // Display image preview if available
              <div>
                
                <img
                
                  className="object-cover bg-slate-900"
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "400px", width: "400px", height: "400px" }}
                />
              </div>
            )}

            {/* </div> */}

            <h2 className="text-4xl text-emerald-600">Add Songs</h2>

            {formValues.Songs.map((song, index) => (
              <>
                <SongForm
                  key={index}
                  index={index}
                  song={song}
                  handleChange={handleSongChange}
                  remove={handleRemoveSong}
                  songsChange={handleSongFileChange}
                  songFileName={songFileNames[index]}
                  songFile={songFiles[index]}
                />
              </>
            ))}

            {/* <button type="button" onClick={handleAddSongs}>
          Add Songs
        </button> */}
            <div className="flex flex-row gap-10 ">
              <FormButton
                onClick={handleAddSongs}
                label={"Add Songs"}
                classNames="w-40"
              />
              <FormButton
                onClick={handleSubmit}
                label={"Add Album"}
                classNames="w-40"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAlbum;
