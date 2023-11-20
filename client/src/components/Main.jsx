import axios from "axios";
import Empty from "./Empty";
import Chat from "./Chat/Chat";
import { useRouter } from "next/router";
import ChatList from "./Chatlist/ChatList";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { useStateProvider } from "@/context/StateContext";

const Main = () => {
  const router = useRouter();
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

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
    const getMessages = async () => {

      const { data } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`);

      dispatch({ type: reducerCases.SET_MESSAGES, messages: data.messages });
    };

    if(currentChatUser?.id) getMessages();
  }, [currentChatUser]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />

      { currentChatUser ? <Chat /> : <Empty /> }

      {/* <Chat /> */}
      {/* <Empty /> */}
    </div>
  );
}

export default Main;
