import Avatar from "../common/Avatar";
import WaveSurfer from "wavesurfer.js";
import { HOST } from "@/utils/ApiRoutes";
import { FaPlay, FaStop } from "react-icons/fa";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "@/utils/CalculateTime";
import { useStateProvider } from "@/context/StateContext";
import React, { useRef, useState, useEffect } from "react";

const VoiceMessage = ({ message }) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [audioMessage, setAudioMessage] = useState(null);
  const [{ currentChatUser, userInfo }] = useStateProvider();
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);

  const waveform = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    const audioURL = `${HOST}/${message.message}`;
    const audio = new Audio(audioURL);

    setAudioMessage(audio);
    waveform.current.load(audioURL);

    waveform.current.on("ready", () => {
      setTotalDuration(waveform.current.getDuration());
    });
  }, [message.message]);

  useEffect(() => {
    if(audioMessage) {

      const updatePlaybackTime = () => {
        setCurrentPlaybackTime(audioMessage.currentTime);
      };

      audioMessage.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audioMessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audioMessage]);

  useEffect(() => {
    if(waveform.current === null) {

      waveform.current = WaveSurfer.create({
        container: waveFormRef.current,
        waveColor: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });
  
      waveform.current.on("finish", () => {
        setIsPlaying(false);
      });
    }
    
    return () => {
      waveform.current.destroy();
    };
  }, []);

  const handlePlayAudio = () => {

    if(audioMessage) {
      waveform.current.stop();
      waveform.current.play();

      audioMessage.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio= () => {
    waveform.current.stop();

    audioMessage.pause();
    setIsPlaying(false);
  };

  const formatTime = time => {
    if(isNaN(time)) return "00:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex items-center gap-5 text-white px-4 pr-2 py-4 text-sm rounded-md ${
      message.senderId === currentChatUser.id 
        ? "bg-incoming-background" 
        : "bg-outgoing-background"
      }`}
    >

      <div>
        <Avatar type="lg" image={currentChatUser?.profilePicture} />
      </div>

      <div className="text-xl cursor-pointer">
        {!isPlaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>

      <div className="relative">
        <div className="w-60" ref={waveFormRef} />

        <div className="pt-1 text-bubble-meta text-[11px] flex justify-between absolute bottom-[-22px] w-full">
          <span>
            {formatTime(isPlaying ? currentPlaybackTime : totalDuration)}
          </span>

          <div className="flex gap-1">
            <span>{calculateTime(message.createdAt)}</span>
            {message.senderId === userInfo.id && <MessageStatus messageStatus={message.messageStatus} />}
          </div>
        </div>

      </div>

    </div>
  );
}

export default VoiceMessage;
