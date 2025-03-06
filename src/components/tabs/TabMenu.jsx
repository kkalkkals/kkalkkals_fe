// src/components/tabs/TabMenu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TabMenu = ({ activeTab, onChangeTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: 'map', label: '지도', icon: '🗺️', path: '/' },
    { id: 'request-list', label: '요청목록', icon: '🗑️', path: '/request-list' },
    { id: 'request-form', label: '요청하기', icon: '✏️', path: '/request-form' },
  ];

  const handleTabClick = (tab) => {
    if (onChangeTab) {
      onChangeTab(tab.id);
    }
    navigate(tab.path);
  };

  return (
    <div className="flex border-t border-gray-200 bg-white fixed bottom-0 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 py-3 flex flex-col items-center ${
            activeTab === tab.id ? 'text-sky-500' : 'text-gray-500'
          }`}
          onClick={() => handleTabClick(tab)}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabMenu;