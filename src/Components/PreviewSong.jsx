import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPlay,
  faPause,
  fa4,
  faStop as faLoader
} from "@fortawesome/free-solid-svg-icons";

const PreviewSong = ({ previewFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [songUrl, setSongUrl] = useState("");
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  const onPlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener("loadedmetadata", () => {
      setTotalTime(audio.duration);
      setIsAudioLoaded(true);
    });

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", () => setIsPlaying(false));
    audio.addEventListener("loadedmetadata", () => {
      setTotalTime(audio.duration);
    
    });

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", () => {});
      audio.removeEventListener("loadedmetadata", () => {});
    };
  }, []);

  const handleSeek = (seekTime) => {
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    console.log(currentTime);
  };
  return (
    <>
      <div className="bg-teal-900 p-4 flex flex-col gap-0 rounded-xl items-start justify-start bg-opacity-80 w-96">
        <div className="flex flex-row items-center justify-evenly">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="pt-2 pr-2 pb-2"
          >
            {isAudioLoaded ?<FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              size="2x"
              onClick={onPlayPauseClick}
            /> : <FontAwesomeIcon
            icon={faLoader}
            size="2x" />
             }
            
          </button>
          <span>
            {`${Math.floor(currentTime / 60)}:${String(
              Math.floor(currentTime % 60)
            ).padStart(2, "0")}`}
            /{" "}
            {`${Math.floor(totalTime / 60)}:${String(
              Math.floor(totalTime % 60)
            ).padStart(2, "0")}`}
            <audio
              src={previewFile}
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
              }}
            ></audio>
          </span>
        </div>
        <input
          type="range"
          min="0"
          max={totalTime}
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
          className="w-full opacity-0 relative z-10"
          style={{
            top: "16.5px",
          }}
        />
        <div className=" bg-black h-1 rounded-full w-full">
          <div
            className="rounded-full h-1 bg-blue-400 relative flex items-center "
            style={{
              width: `${(currentTime / totalTime) * 100}%`,
              transition: "transform 1s linear",
            }}
          >
            <div
              className="bg-white absolute opacity-100 rounded-full border-solid border-2 border-teal-900  "
              style={{
                transformY: "translate(-50%)",
                left: `95%`,
                transition: "transform 1s linear",
                width: "1.2rem",
                height: "1.2rem",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewSong;
