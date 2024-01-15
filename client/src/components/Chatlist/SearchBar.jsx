import React from "react";
import { BsFilter } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";

const SearchBar = () => {
  const [{contactSearch}, dispatch] = useStateProvider();

  return (
    <div className="bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">

        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        </div>
      
        <div>
          <input 
            type="text" 
            placeholder="Search or start a new chat" 
            className="text-sm bg-transparent focus:outline-none text-white w-full"
            value={contactSearch}
            onChange={e => dispatch({ type: reducerCases.SET_CONTACT_SEARCH, contactSearch: e.target.value })}
          />
        </div>

      </div>

      <div className="pr-5 pl-3 ">
        <BsFilter className="text-panel-header-icon cursor-pointer text-l" />
      </div>

    </div>
  );
}

export default SearchBar;
