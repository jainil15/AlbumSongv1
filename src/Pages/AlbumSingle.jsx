import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PreviewSong from "../Components/PreviewSong";

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
        <section className="flex flex-col gap-2 items-center">
          <h1 className="text-5xl font-semibold">{values?.title}</h1>
          <div className="w-96">
            <img src={values?.imageUrl} />
          </div>
          {values?.songs?.map((song, index) => (
            <div>
              <div>
                <Link to={`../song/${song?.id}`}>
                  <div>{song?.title}</div>
                </Link>
              </div>
              <PreviewSong previewFile={song?.songUrl} key={index} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AlbumSingle;
