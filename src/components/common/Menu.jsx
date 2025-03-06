import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const mainMenuItems = [
    { label: '배출대행', path: '/request-form' },
    { label: '클린하우스란?', path: '/guide' },
  ];

  const otherMenuItems = [
    { label: '지도', path: '/' },
    { label: '클린하우스란?', path: '/guide' },
  ];

  const menuItems = location.pathname === '/' ? mainMenuItems : otherMenuItems;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div ref={menuRef} className="absolute top-0 right-0 mt-14 mr-4 z-50">
      <div className="bg-white rounded-lg w-48 shadow-lg overflow-hidden">
        <ul className="py-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 text-sm"
                onClick={() => handleMenuClick(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
