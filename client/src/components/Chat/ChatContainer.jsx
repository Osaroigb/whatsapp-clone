import React from "react";

const ChatContainer = () => {
  return (
    <div className="w-full relative h-[80vh] flex-grow overflow-auto custom-scrollbar">

      <div className="bg-fixed bg-chat-background h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      
      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto"></div>
      </div>

    </div>
  );
}

export default ChatContainer;
