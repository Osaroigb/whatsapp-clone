import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { reducerCases } from "@/context/constants";
import { GET_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";
import ChatLIstItem from "./ChatLIstItem";

const ContactsList = () => {
  const [{}, dispatch] = useStateProvider();
  const [allContacts, setAllContacts] = useState([]);

  useEffect(() => {

    const getContacts = async () => {

      try {
        const { data: { users } } = await axios.get(GET_CONTACTS_ROUTE);
        setAllContacts(users);
      } catch (err) {
        console.error(err);
      } 
    };

    getContacts();
  }, [])

  return (
    <div className="h-full flex flex-col">

      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack 
            className="text-xl cursor-pointer"
            onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
          />

          <span>New Chat</span>
        </div>
      </div>

      <div className="h-full flex-auto overflow-auto bg-search-input-container-background custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">

          <div className="flex items-center bg-panel-header-background gap-5 px-3 py-1 rounded-lg flex-grow mx-4">

            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
            </div>
          
            <div>
              <input 
                type="text" 
                placeholder="Search Contacts" 
                className="text-sm bg-transparent focus:outline-none text-white w-full"
              />
            </div>

          </div>

        </div>

        {
          Object.entries(allContacts).map(([initialLetter, userList]) => {
            // console.info(userList);

            return (
              <div key={Date.now() + initialLetter}>
                <div className="pl-10 text-teal-light py-5">{initialLetter}</div>
                {
                  userList.map(contact => {
                    // console.info(contact);

                    return (
                      <ChatLIstItem 
                        data={contact}
                        isContactPage={true}
                        key={contact.id}
                      />
                    );
                  })
                }
              </div>
            );

          })
        }

      </div>

    </div>
  );
}

export default ContactsList;
