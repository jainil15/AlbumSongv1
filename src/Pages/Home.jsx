import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Home = () => {
  const [values, setValues] = useState([
    {
      id: "",
      title: "",
      imageUrl: "",
      artist: "",
      releaseDate: new Date(),
      songs: [
        {
          id: "",
          albumId: "",
          artists: "",
          title: "",
          songUrl: "",
        },
      ],
    },
  ]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await axios.get("/album");
        console.log(res);
        res.data.releaseDate = new Date(res.data.releaseDate);
        setValues(res.data);
      } catch (err) {
        setErrors(err);
      }
    };
    fetchValues();
  }, []);

  return (
    <div className="bg-black">
      <div className="grid grid-cols-5 gap-5">
        {values[0].id == "" ||
          values?.map((item, key) => (
            <div>
              <div className="text-2xl font-semibold">{item.title}</div>
              <div>
                <img
                  src={item.imageUrl}
                  onClick={() => navigate(`/album/${item.id}`)}
                />
              </div>
              <div>{item.artist}</div>
              <div>{new Date(item.releaseDate).getFullYear().toString()}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
