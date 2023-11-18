import React from "react";
import { MdSend } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
// import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";

const MessageBar = () => {
  return (
    <div className="h-20 bg-panel-header-background px-4 flex items-center gap-6 relative">
      
      <>
      <div className="flex gap-6">
        <BsEmojiSmile className="text-xl text-panel-header-icon cursor-pointer" title="Emoji" />
        <ImAttachment className="text-xl text-panel-header-icon cursor-pointer" title="Attach File" />
      </div>

      <div className="w-full rounded-lg h-10 flex items-center">
        <input type="text" placeholder="Type a message" className="text-sm focus:outline-none bg-input-background text-white h-10 rounded-lg px-5 py-4 w-full"/>
      </div>

      <div className="flex w-10 items-center justify-center">
        <button>
          <MdSend className="text-xl text-panel-header-icon cursor-pointer" title="Send Message"/>
          {/* <FaMicrophone className="text-xl text-panel-header-icon cursor-pointer" title="Record" /> */}
        </button>
      </div>
      </>

    </div>
  );
}

export default MessageBar;
