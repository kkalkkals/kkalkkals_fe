import React, { useState } from 'react';
import KakaoMap from '../components/Map/KakaoMap';
import SearchBar from '../components/Map/SearchBar';
import Menu from '../components/common/Menu';
import './MainPage.css';

const MainPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  return (
    <div className="main-container">
      <div className="search-container">
        <SearchBar onSearch={setSearchKeyword} />
        <Menu />
      </div>
      <div className="map-container">
        <KakaoMap />
      </div>
    </div>
  );
};

export default MainPage;