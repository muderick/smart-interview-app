import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SearchBar = ({ handleSearch, handleClearSearch, searchTerm }) => {

  return (
    <div className="mb-5 flex items-center justify-center">
      <div className="w-full relative mr-5">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-3 pl-10 pr-4 text-base border-solid border-b-[#ddd] transition-colors focus:outline-none focus:border-b-[#3498db] focus:shadow-sm"
        />
      </div>
      <button
        onClick={handleClearSearch}
        className="shadow-sm px-4 py-3 bg-white text-base rounded hover:cursor-pointer hover:shadow-md hover:scale-[105%] transition-all"
        title="Clear Search"
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
};

export default SearchBar;
