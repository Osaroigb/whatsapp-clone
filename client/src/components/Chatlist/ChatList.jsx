import React from "react";
import List from "./List";
import SearchBar from "./SearchBar";
import ChatListHeader from "./ChatListHeader";

const ChatList = () => {
  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      <ChatListHeader />
      <SearchBar />
      <List />
    </div>
  );
}

export default ChatList;
