import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const menuItems = [
    { label: '지도', path: '/' },
    { label: '가이드', path: '/guide' },
    { label: '배출 요청하기', path: '/request-form' },
    { label: '요청 목록', path: '/request-list' },
    { label: '마이페이지', path: '/mypage' },
    { label: '로그아웃', path: '/logout' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">메뉴</h2>
          <button onClick={onClose} className="text-2xl">
            &times;
          </button>
        </div>

        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
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
