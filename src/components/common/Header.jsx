import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBack = true, showMenu = true }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <header className="header">
        {showBack ? (
          <button
            onClick={() => navigate(-1)}
            className="back-button"
            aria-label="뒤로 가기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
        ) : (
          <div className="w-8"></div>
        )}

        <h1 className="header-title">{title}</h1>

        {showMenu ? (
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        ) : (
          <div className="w-8"></div>
        )}
      </header>

      {isMenuOpen && (
        <div className="menu-dropdown">
          <button
            onClick={() => {
              navigate('/');
              setIsMenuOpen(false);
            }}
            className="menu-item"
          >
            <span>지도</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
          <button
            onClick={() => {
              navigate('/guide');
              setIsMenuOpen(false);
            }}
            className="menu-item"
          >
            <span>클린하우스란?</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
