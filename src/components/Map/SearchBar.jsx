import React, { useState, useEffect } from "react";

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

    // 검색어에 맞는 동네 필터링
    if (districts) {
      const filtered = districts.filter((district) =>
        district.name.toLowerCase().includes(keyword.toLowerCase())
      );

      setSearchResults(filtered);
      setShowResults(filtered.length > 0);
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
    <div className="relative">
      <form onSubmit={handleSubmit} className="searchInput">
        <div className="p-1">
          <span role="img" aria-label="orange">
            🍊
          </span>
        </div>
        <div
          className="search-container"
          style={{
            // width: "calc(100% - 20px)",
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="제주도 읍면동을 검색해주세요"
            style={{
              width: "100%",
              // borderRadius: "12px",
            }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button type="submit" className="p-1">
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
        <div className="absolute top-full left-3 right-3 mt-2 px-0 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
          {searchResults.map((district, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
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
