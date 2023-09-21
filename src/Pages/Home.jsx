import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import RippleButton from "../Components/RippleButton";
import { AuthContext } from "../Context/AuthContext";
const Home = () => {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [skip, setSkip] = useState(1);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await axios.get(`album/batch?skip=${skip}`);
        res.data.releaseDate = new Date(res.data.releaseDate);
        setValues(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    };
    fetchValues();
  }, [skip]);

  return (
    <div className="bg-black">
      {currentUser ? (
        <div
          className="grid overflow-x-auto gap-5 items-center"
          style={{ gridTemplateColumns: `repeat(${values.length + 1}, auto)` }}
        >
          {values?.map((item, key) => (
            <div className="flex flex-col">
              <div className="text-2xl font-semibold overflow-hidden text-ellipsis self-center">
                {item.title}
              </div>
              <div className="w-40 h-40">
                <img
                  className="rounded-xl cursor-pointer"
                  src={item.imageUrl}
                  alt={item.title}
                  onClick={() => navigate(`/album/${item.id}`)}
                />
              </div>
              <div className="overflow-hidden text-ellipsis">{item.artist}</div>
              <div className="overflow-hidden text-ellipsis">
                {new Date(item.releaseDate).getFullYear().toString()}
              </div>
            </div>
          ))}

          <button
            className="w-fit h-fit p-5"
            onClick={(e) => {
              e.preventDefault();
              setSkip((prev) => prev + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowAltCircleRight} size="3x" />
          </button>
        </div>
      ) : (
        <div className="text-5xl flex items-center bg-teal-950 p-5 justify-center text-red-600">
          Please &nbsp;{" "}
          <Link to="Login" className="text-blue-600 underline">
            Login
          </Link>{" "}
          &nbsp; to view home page
        </div>
      )}
    </div>
  );
};

export default Home;
