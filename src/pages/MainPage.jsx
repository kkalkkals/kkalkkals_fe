import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/Map/KakaoMap';

const MainPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="h-screen flex flex-col">
      <div className="absolute top-4 left-0 right-0 z-10 px-4">
        <div className="bg-white rounded-full shadow-md flex items-center p-2">
          <div className="p-1">
            <span role="img" aria-label="orange">
              🍊
            </span>
          </div>
          <input
            type="text"
            placeholder="찾으시는 주소 입력해주세요"
            className="flex-1 px-2 py-1 outline-none text-sm"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="p-1">
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
          <button className="ml-2 p-1" onClick={() => navigate('/menu')}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                fill="#333"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <KakaoMap />
      </div>
    </div>
  );
};

export default MainPage;
