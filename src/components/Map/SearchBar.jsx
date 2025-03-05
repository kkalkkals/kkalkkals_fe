import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-670 bg-white rounded-full shadow-md flex items-center p-2"
    >
      <div className="p-1">
        <span role="img" aria-label="orange">
          🍊
        </span>
      </div>
      <div className="search-container" style={{ 
        width: 'calc(100% - 20px)', 
        maxWidth: '100%',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}>
        <input
          type="text"
          placeholder="찾으시는 주소 입력해주세요"
          style={{ 
            width: '100%', 
            boxSizing: 'border-box' 
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
  );
};

export default SearchBar;
