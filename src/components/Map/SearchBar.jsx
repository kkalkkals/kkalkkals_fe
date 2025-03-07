import React, { useState, useEffect } from "react";
import "../../styles/searchBar.css";

const SearchBar = ({ onSearch, districts, onDistrictSelect }) => {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (keyword.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (districts) {
      const filtered = districts.filter((district) =>
        district.name.toLowerCase().includes(keyword.toLowerCase())
      );

      setSearchResults(filtered);
      setShowResults(filtered.length > 1);
    }
  }, [keyword, districts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  const handleDistrictClick = (district) => {
    setKeyword(district.name);
    setShowResults(false);
    if (onDistrictSelect) {
      onDistrictSelect(district);
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-icon">🍊</div>
        <div className="search-container">
          <input
            type="text"
            placeholder="제주도 읍면동을 검색해주세요"
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              fill="#333"
            />
          </svg>
        </button>
      </form>

      {showResults && (
        <div className="search-results">
          {searchResults.map((district, index) => (
            <div
              key={index}
              className="search-result-item"
              onClick={() => handleDistrictClick(district)}
            >
              {district.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
