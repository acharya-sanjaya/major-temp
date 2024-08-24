import React, {useState} from "react";
import {Search as SearchIcon} from "../../assets/Icons";

interface SearchProps {
  handleSearch: (searchKey: string) => void;
}

const Search = ({handleSearch}: SearchProps) => {
  const [searchKey, setSearchKey] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchKey(value);
    handleSearch(value);
  };

  return (
    <div className="w-full px-4">
      <div className="relative max-w-[500px] flex items-center m-auto">
        <input
          className="w-full px-6 py-2 pr-12 bg-secondary text-secondary-foreground focus:outline-none border-2 border-secondary-foreground transition-colors duration-500 rounded-full focus:border-blue-500"
          value={searchKey}
          onChange={handleChange}
          type="text"
          placeholder="Search..."
        />
        <div className="absolute right-4 bg-transparent">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
