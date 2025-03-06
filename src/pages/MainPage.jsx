import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KakaoMap from "../components/Map/KakaoMap";
import SearchBar from "../components/Map/SearchBar";
import "../styles/main.css";
import hamburgerIcon from "../asset/hamburger.svg";

const MainPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="main-container">
      <div className="search-container relative">
        <SearchBar onSearch={setSearchKeyword} />
        <div className="hamburger">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="hamburgerSVG"
          >
            <img src={hamburgerIcon} className="hamburgerSVG" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  navigate("/request-list");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="text-gray-700">배출 대행</span>
              </button>
              <button
                onClick={() => {
                  navigate("/guide");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-t border-gray-100"
              >
                <span className="text-gray-700">클린하우스란?</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="map-container">
        <KakaoMap searchKeyword={searchKeyword} />
      </div>
    </div>
  );
};

export default MainPage;
