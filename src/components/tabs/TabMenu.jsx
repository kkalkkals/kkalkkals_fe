import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabMenu = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="flex border-t border-gray-200 bg-white">
      <button
        className={`flex-1 py-3 flex flex-col items-center ${
          activeTab === 'map' ? 'text-sky-500' : 'text-gray-500'
        }`}
        onClick={() => navigate('/')}
      >
        <span className="text-xl">🗺️</span>
        <span className="text-xs mt-1">지도</span>
      </button>
      <button
        className={`flex-1 py-3 flex flex-col items-center ${
          activeTab === 'guide' ? 'text-sky-500' : 'text-gray-500'
        }`}
        onClick={() => navigate('/guide')}
      >
        <span className="text-xl">📖</span>
        <span className="text-xs mt-1">가이드</span>
      </button>
      <button
        className={`flex-1 py-3 flex flex-col items-center ${
          activeTab === 'request' ? 'text-sky-500' : 'text-gray-500'
        }`}
        onClick={() => navigate('/request-list')}
      >
        <span className="text-xl">🗑️</span>
        <span className="text-xs mt-1">요청목록</span>
      </button>
      <button
        className={`flex-1 py-3 flex flex-col items-center ${
          activeTab === 'mypage' ? 'text-sky-500' : 'text-gray-500'
        }`}
        onClick={() => navigate('/mypage')}
      >
        <span className="text-xl">👤</span>
        <span className="text-xs mt-1">마이페이지</span>
      </button>
    </div>
  );
};

export default TabMenu;
