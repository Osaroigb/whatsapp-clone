import axios from "axios";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";

const List = () => {
  const [{ userInfo, userContacts }, dispatch] = useStateProvider();

  useEffect(() => {
    const getContacts = async() => {
      try {
        const { data: { users, onlineUsers } } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);

        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: users });
      } catch (err) {
        console.error(err);
      }
    };
  
    // return () => {};
    if(userInfo?.id) getContacts();
  }, [userInfo])
  
  return (
    <div className="flex-auto bg-search-input-container-background overflow-auto max-h-full custom-scrollbar">
      {userContacts.map((contact) => <ChatLIstItem data={contact} key={contact.id}/>)}
    </div>
  );
};

export default List;
