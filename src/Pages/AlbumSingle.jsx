import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PreviewSong from "../Components/PreviewSong";
import MusicPlayer from "../Components/MusicPlayer";

const AlbumSingle = () => {
  const location = useLocation();
  const albumId = location.pathname.split("/")[2];
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await axios.get(`/album/${albumId}`);
        setValues(res.data);
      } catch (err) {
        setErrors(err?.errors);
        navigate("/login");
      }
    };
    fetchValues();
  }, []);

  return (
    <div className="bg-slate-950 text-white">
      <div>
        <div className="flex flex-col gap-2 items-center w-fit m-auto bg-slate-800 p-3 rounded-xl mt-2">
          <h1 className="text-5xl font-bold">{values?.title}</h1>
          <div>
            <div className="w-96">
              <img
                className="rounded-xl w-96 h-96 bg-slate-900"
                src={values?.imageUrl}
              />
            </div>
            <div className="text-ellipsis overflow-hidden">{values.artist}</div>
          </div>
          {values?.songs?.map((song, index) => (
            <div className="bg-slate-900 p-2 rounded-2xl">
              <h2 className="ps-1 opacity-50">{song.title}</h2>
              <PreviewSong
                previewFile={song?.songUrl}
                key={index}
                className="bg-slate-600 w-[26rem]"
              />
              <h2 className="ps-1 opacity-50">{song.artists}</h2>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AlbumSingle;
