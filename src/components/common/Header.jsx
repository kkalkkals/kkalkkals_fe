// src/components/common/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, showBack = true, showMenu = true }) => {
  const navigate = useNavigate();
  
  return (
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
          onClick={() => navigate('/menu')}
          aria-label="메뉴"
        >
          ☰
        </button>
      ) : (
        <div className="w-6"></div>
      )}
    </header>
  );
};

export default Header;