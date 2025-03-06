import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/header.css';

const Header = ({ title, showBack = true, showMenu = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = location.pathname === '/' 
    ? [
        { label: '배출 대행', path: '/request-list' },
        { label: '클린하우스란?', path: '/guide' }
      ]
    : [
        { label: '지도', path: '/map' },
        { label: '클린하우스란?', path: '/guide' }
      ];

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

        {showMenu && (
          <div className="menu-container">
            <button
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            
            {isMenuOpen && (
              <div className="menu-dropdown">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="menu-item"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {!showMenu && <div className="w-8"></div>}
      </header>
    </div>
  );
};

export default Header;
