import axios from "axios";
import Empty from "./Empty";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import { useRouter } from "next/router";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import ChatList from "./Chatlist/ChatList";
import { onAuthStateChanged } from "firebase/auth";
import { reducerCases } from "@/context/constants";
import SearchMessages from "./Chat/SearchMessages";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useRef, useState } from "react";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingVoiceCall from "./common/IncomingVoiceCall";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";

const Main = () => {
  const socket = useRef();
  const router = useRouter();

  const [socketEvent, setSocketEvent] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);

  const [
    { 
      userInfo, 
      currentChatUser, 
      messagesSearch, 
      videoCall, 
      voiceCall, 
      incomingVoiceCall, 
      incomingVideoCall 
    }, dispatch
  ] = useStateProvider();

  useEffect(() => {
    if(redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async(currentUser) => {
    if(!currentUser) setRedirectLogin(true);

    if(!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, { 
        email: currentUser.email 
      });

      if(!data.success) router.push("/login");

      if(data?.data) {
        const { id, name, email, profilePicture: profileImage, status } = data.data;

        dispatch({
          type: reducerCases.SET_USER_INFO, 
          userInfo: {
            id,
            name, 
            email, 
            profileImage, 
            status
          }
        });
      }

    }

  });

  useEffect(() => {

    if(userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);

      dispatch({ type: reducerCases.SET_SOCKET, socket});
    }
  }, [userInfo]);

  useEffect(() => {

    if(socket.current && !socketEvent) {
      socket.current.on("msg-receive", data => {
        dispatch({ 
          type: reducerCases.ADD_MESSAGE, 
          newMessage: { ...data.message }
        });

      });

      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VOICE_CALL,
          incomingVoiceCall: { ...from, roomId, callType }
        });
      });

      socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
        dispatch({
          type: reducerCases.SET_INCOMING_VIDEO_CALL,
          incomingVideoCall: { ...from, roomId, callType }
        });
      });

      socket.current.on("voice-call-rejected", () => {
        dispatch({ type: reducerCases.END_CALL });
      });

      socket.current.on("video-call-rejected", () => {
        dispatch({ type: reducerCases.END_CALL });
      });

      // socket.current.on("accept-incoming-call", ({ id }) => {
      //   dispatch({ type: reducerCases.END_CALL });
      // });

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {

      const { data } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`);

      dispatch({ type: reducerCases.SET_MESSAGES, messages: data.messages });
    };

    if(currentChatUser?.id) getMessages();
  }, [currentChatUser]);

  return (
    <>
    {incomingVideoCall && <IncomingVideoCall />}
    {incomingVoiceCall && <IncomingVoiceCall />}

    {videoCall && (
      <div className="w-screen h-screen max-h-full overflow-hidden">
        <VideoCall/>
      </div>
    )}

    {voiceCall && (
      <div className="w-screen h-screen max-h-full overflow-hidden">
        <VoiceCall/>
      </div>
    )}
    
    {!videoCall && !voiceCall && (
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        <ChatList />
        {currentChatUser ? 
        <div className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}>
          <Chat />
          {messagesSearch && <SearchMessages />}
        </div> 
        : <Empty />}
      </div>
    )}
    </>
  );
}

export default Main;
