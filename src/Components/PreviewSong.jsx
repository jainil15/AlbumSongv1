import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPlay,
  faPause,
  fa4,
  faStop as faLoader,
} from "@fortawesome/free-solid-svg-icons";

const PreviewSong = ({ previewFile, className = "" }) => {
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
      <div
        className={`bg-slate-800 p-4 flex flex-col gap-0 rounded-xl items-start justify-start bg-opacity-80 w-96 ${className}`}
      >
        <div className="flex flex-row items-center justify-evenly">
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
        <div className="w-full flex items-center gap-2 ">
        <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="pt-2 pr-2 pb-2 w-10"
          >
            {isAudioLoaded ? (
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                size="2x"
                onClick={onPlayPauseClick}
              />
            ) : (
              <FontAwesomeIcon icon={faLoader} size="2x" />
            )}
          </button>
        <input
          type="range"
          min="0"
          max={totalTime}
          value={currentTime}
          onChange={(e) => handleSeek(e.target.value)}
          className="w-[100%] h-1 bg-black rounded-md slider"
        />
        </div>
      </div>
    </>
  );
};

export default PreviewSong;
