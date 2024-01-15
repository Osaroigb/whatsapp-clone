import axios from "axios";
import ChatLIstItem from "./ChatLIstItem";
import { BiArrowBack } from "react-icons/bi";
import { BiSearchAlt2 } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { reducerCases } from "@/context/constants";
import { GET_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import { useStateProvider } from "@/context/StateContext";

const ContactsList = () => {
  const [{}, dispatch] = useStateProvider();
  const [allContacts, setAllContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchContacts, setSearchContacts] = useState([]);

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = {};

      Object.keys(allContacts).forEach(key => {
        filteredData[key] = allContacts[key].filter(obj => obj.name.toLowerCase().includes(searchTerm.toLowerCase()))
      });

      setSearchContacts(filteredData);
    } else {
      setSearchContacts(allContacts);
    }
  }, [searchTerm])
  
  useEffect(() => {

    const getContacts = async () => {

      try {
        const { data: { users } } = await axios.get(GET_CONTACTS_ROUTE);

        setAllContacts(users);
        setSearchContacts(users);
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
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

          </div>

        </div>

        {Object.entries(searchContacts).map(([initialLetter, userList]) => {
            // console.info(userList);
            return (
              userList.length > 0 && (
                <div key={Date.now() + initialLetter}>
                  <div className="pl-10 text-teal-light py-5">{initialLetter}</div>
                  
                  {userList.map(contact => {
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
              )
             
            );

        })}

      </div>

    </div>
  );
}

export default ContactsList;
