import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBack = true, showMenu = true }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <header className="bg-sky-400 text-white py-3 px-4 flex justify-between items-center">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="text-2xl font-bold"
            aria-label="뒤로 가기"
          >
            &lt;
          </button>
        ) : (
          <div className="w-6"></div>
        )}

        <h1 className="text-xl font-bold">{title}</h1>

        {showMenu ? (
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            ☰
          </button>
        ) : (
          <div className="w-6"></div>
        )}
      </header>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <button
            onClick={() => {
              navigate('/');
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
          >
            <span className="text-gray-700">지도</span>
            <span className="text-gray-400">→</span>
          </button>
          <button
            onClick={() => {
              navigate('/guide');
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-t border-gray-100"
          >
            <span className="text-gray-700">클린하우스란?</span>
            <span className="text-gray-400">→</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
