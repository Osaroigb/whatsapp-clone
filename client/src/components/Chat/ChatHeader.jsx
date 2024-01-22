import Avatar from "../common/Avatar";
import React, { useState } from "react";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import ContextMenu from "../common/ContextMenu";
import { reducerCases } from "@/context/constants";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";

const ChatHeader = () => {
  const [{ currentChatUser, onlineUsers }, dispatch] = useStateProvider();

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0  
  });
  
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX - 50, y: e.pageY + 20 });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    { 
      name: "Exit", 
      callback: () => {
        dispatch({ type: reducerCases.SET_EXIT_CHAT})
      } 
    }
  ];

  const handleVoiceCall = () => {
    dispatch({ 
      type: reducerCases.SET_VOICE_CALL,
      voiceCall : {
        ...currentChatUser,
        type: "out-going",
        callType: "voice",
        roomId: Date.now()
      }
    });
  };

  const handleVideoCall = () => {
    dispatch({ 
      type: reducerCases.SET_VIDEO_CALL,
      videoCall : {
        ...currentChatUser,
        type: "out-going",
        callType: "video",
        roomId: Date.now()
      }
    });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background z-10">
      
      <div className="flex items-center justify-center gap-6">
        
        {/* <Avatar type="sm" image={"/profile"} />  */}
        <Avatar type="sm" image={currentChatUser?.profilePicture} /> 
        
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">
            {
              onlineUsers.includes(currentChatUser.id) ? "online" : "offline"
            }
          </span>
        </div>

      </div>

      <div className="flex gap-6">
        <MdCall 
          className="cursor-pointer text-panel-header-icon text-xl"
          onClick={handleVoiceCall}
        />

        <IoVideocam 
          className="cursor-pointer text-panel-header-icon text-xl"
          onClick={handleVideoCall}
        />

        <BiSearchAlt2 className="cursor-pointer text-panel-header-icon text-xl" onClick={() => dispatch({type: reducerCases.SET_MESSAGE_SEARCH})}/>
        <BsThreeDotsVertical 
          className="cursor-pointer text-padnel-header-icon text-xl"
          onClick={(e) => showContextMenu(e)}
          id="context-opener"
        />

        {isContextMenuVisible && (
          <ContextMenu 
            options={contextMenuOptions}
            cordinates={contextMenuCordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )}
      </div>

    </div>
  );
}

export default ChatHeader;
