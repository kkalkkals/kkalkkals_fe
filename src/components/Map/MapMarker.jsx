// src/components/Map/MapMarker.jsx
import React from 'react';
import { MapMarker as KakaoMapMarker } from 'react-kakao-maps-sdk';

const MapMarker = ({ position, type, onClick, isSelected }) => {
  // 마커 이미지 설정
  const getMarkerImage = () => {
    switch(type) {
      case 'cleanhouse':
        return {
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          size: { width: 24, height: 35 },
        };
      case 'recycling':
        return {
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          size: { width: 24, height: 35 },
        };
      case 'current':
        return null; // 현재 위치는 CustomOverlay로 처리
      default:
        return null;
    }
  };

  return (
    <KakaoMapMarker
      position={position}
      onClick={onClick}
      image={getMarkerImage()}
    />
  );
};

export default MapMarker;