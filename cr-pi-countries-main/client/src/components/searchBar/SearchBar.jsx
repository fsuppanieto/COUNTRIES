import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName, updateSearchTerm } from "../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);

  const handleInputChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  const handleSearch = () => {
    dispatch(searchByName(searchTerm));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by country name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
