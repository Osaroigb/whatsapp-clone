import React from "react";
import ChatHeader from "./ChatHeader";
import MessageBar from "./MessageBar";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  return (
    <div className="border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-10">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
}

export default Chat;
