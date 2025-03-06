import React, { useState } from 'react';
import KakaoMap from '../components/Map/KakaoMap';
import SearchBar from '../components/Map/SearchBar';
import Menu from '../components/common/Menu';

const MainPage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="absolute top-4 left-0 right-0 z-10 px-4 flex items-center gap-2">
        <SearchBar onSearch={setSearchKeyword} />
        <Menu />
      </div>
      <div className="relative w-full overflow-hidden">
        <KakaoMap />
      </div>
    </div>
  );
};

export default MainPage;