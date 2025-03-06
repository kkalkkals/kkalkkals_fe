// src/components/Map/LocationInfo.jsx
import React from 'react';

const LocationInfo = ({ facility, onClose }) => {
  if (!facility) return null;

  const getIconByType = (type) => {
    switch(type) {
      case 'cleanhouse':
        return '🏢';
      case 'recycling':
        return '♻️';
      default:
        return '📍';
    }
  };

  const handleFindRoute = () => {
    // 카카오맵 길찾기 URL 열기
    window.open(`https://map.kakao.com/link/to/${facility.name},${facility.position.lat},${facility.position.lng}`);
  };

  return (
    <div className="bg-white p-4 rounded-t-lg shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start">
          <div className="mr-2 text-2xl">
            {getIconByType(facility.type)}
          </div>
          <div>
            <h3 className="font-bold text-lg">{facility.name}</h3>
            <p className="text-sm text-gray-600">{facility.address}</p>
            <p className="text-sm text-gray-600">운영 시간: {facility.operationHours}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <button
        onClick={handleFindRoute}
        className="w-full py-2 bg-sky-400 text-white rounded-md mt-2"
      >
        길찾기
      </button>
    </div>
  );
};

export default LocationInfo;