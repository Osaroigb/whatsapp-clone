import { IoClose } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import { useStateProvider } from "@/context/StateContext";

const SearchMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);
  const [{currentChatUser, messages}, dispatch] = useStateProvider();

  useEffect(() => {
    
    if(searchTerm) {
      setSearchedMessages(messages.filter(message => message.type === "text" && message.message.includes(searchTerm)));
    } else {
      setSearchedMessages([]);
    }
  
    // return () => {};
  }, [searchTerm])
  

  return (
    <div className="border-l border-conversation-border w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen">
      
      <div className="h-16 px-4 py-5 flex gap-10 items-center bg-panel-header-background text-primary-strong">
        <IoClose 
          className="text-2xl cursor-pointer text-icon-lighter" 
          onClick={() => dispatch({type: reducerCases.SET_MESSAGE_SEARCH})}
        />
        <span>Search Messages</span>
      </div>

      <div className="h-full overflow-auto custom-scrollbar">
        <div className="flex items-center flex-col w-full">
          
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            
            <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">

              <div>
                <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
              </div>

              <div>
                <input 
                  type="text" 
                  placeholder="Search messages here" 
                  className="text-sm bg-transparent focus:outline-none text-white w-full"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

            </div>

          </div>

          <span className="mt-10 text-secondary">
            {!searchTerm.length && `Search for messages with ${currentChatUser.name}`}
          </span>
        </div>

        <div className="flex justify-center h-full flex-col">
          {searchTerm.length > 0 && !searchedMessages.length && (
            <span className="text-secondary w-full flex justify-center">No messages found</span>
          )}
          
          <div className="flex flex-col w-full h-full">
            {searchedMessages.map(message => (
              <div className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b-[0.1px] border-secondary py-5">
                <div className="text-sm text-secondary">
                  {calculateTime(message.createdAt)}
                </div>

                <div className="text-icon-green">
                  {message.message}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchMessages;
