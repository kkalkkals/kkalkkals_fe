import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

// kakao 객체를 window에서 가져오기
const { kakao } = window;

const KakaoMap = () => {
  const [center, setCenter] = useState({ lat: 33.450701, lng: 126.570667 });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [level, setLevel] = useState(3);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // 시설 데이터 (클린하우스, 재활용도움센터 등)
  const facilityData = [
    {
      id: 1,
      type: 'cleanhouse',
      name: '클린하우스',
      address: '제주특별자치도 제주시 한림읍 대림리 1298-1',
      operationHours: '16:00 ~ 04:00',
      position: { lat: 33.450701, lng: 126.570667 },
    },
    {
      id: 2,
      type: 'recycling',
      name: '재활용도움센터',
      address: '제주특별자치도 제주시 한림읍 대림리 1298-1',
      operationHours: '07:00 ~ 22:00',
      position: { lat: 33.452564, lng: 126.574041 },
    },
  ];

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  }, []);

  // 지도 초기화 시 크기 설정 부분
  useEffect(() => {
    if (!kakao) {
      console.error('Kakao maps SDK not loaded');
      return;
    }
    
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };
    
    // 지도 생성 후 크기 재설정
    const map = new kakao.maps.Map(container, options);
    
    // 지도 크기를 컨테이너에 맞게 조정
    const resizeMap = () => {
      const mapContainer = document.getElementById('map');
      const parentWidth = mapContainer.parentElement.clientWidth;
      mapContainer.style.width = parentWidth + 'px';
      map.relayout(); // 지도 레이아웃 재설정
    };
    
    // 초기 로드 및 리사이즈 시 지도 크기 조정
    resizeMap();
    window.addEventListener('resize', resizeMap);
    
    return () => window.removeEventListener('resize', resizeMap);
  }, []);

  // 마커 아이콘 설정
  const getMarkerImage = (type) => {
    switch (type) {
      case 'cleanhouse':
        return {
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          size: { width: 24, height: 35 },
        };
      case 'recycling':
        return {
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          size: { width: 24, height: 35 },
        };
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <div 
        id="map" 
        style={{ 
          width: '100%',       // 부모 요소의 너비에 맞춤
          height: '100vh',     // 높이는 유지
          position: 'relative',
          overflow: 'hidden'   // 넘치는 부분 숨김
        }}
      ></div>
      <Map
        center={center}
        level={level}
        style={{ width: '100%', height: '100%' }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        {/* 시설 마커 */}
        {facilityData.map((facility) => (
          <MapMarker
            key={facility.id}
            position={facility.position}
            image={getMarkerImage(facility.type)}
            onClick={() => setSelectedFacility(facility)}
          />
        ))}

        {/* 현재 위치 마커 */}
        {currentPosition && (
          <CustomOverlayMap position={currentPosition}>
            <div className="relative">
              <div className="w-6 h-6 bg-blue-400 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </CustomOverlayMap>
        )}

        {/* 선택된 시설 정보 표시 */}
        {selectedFacility && (
          <CustomOverlayMap position={selectedFacility.position} yAnchor={1.5}>
            <div className="p-3 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-lg">{selectedFacility.name}</h3>
              <p className="text-sm">{selectedFacility.address}</p>
              <p className="text-sm">
                운영시간: {selectedFacility.operationHours}
              </p>
            </div>
          </CustomOverlayMap>
        )}
      </Map>

      {/* 현재 위치로 이동 버튼 */}
      <button
        className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center z-10"
        onClick={() => currentPosition && setCenter(currentPosition)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default KakaoMap;
