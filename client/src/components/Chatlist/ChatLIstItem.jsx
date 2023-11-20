import React from "react";
import Avatar from "../common/Avatar";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";

const ChatLIstItem = ({ data, isContactPage = false }) => {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const handleContactClick = () => {

    // if(currentChatUser?.id === data?.id) {

    dispatch({ 
      type: reducerCases.CHANGE_CURRENT_CHAT_USER, 
      user: { ...data },
    });

    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    // }
  };

  return (
    <div className={`flex cursor-pointer items-center hover:bg-background-default-hover`} onClick={handleContactClick}>
      
      <div className="px-5 min-w-fit pt-3 pb-1">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>

      <div className="flex-col justify-center min-h-full flex mt-3 pr-2 w-full">
        
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>

        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-sm text-secondary line-clamp-1">
              {data?.about || "\u00A0"}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default ChatLIstItem;
