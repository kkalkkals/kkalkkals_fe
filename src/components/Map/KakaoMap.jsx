import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";

import axios from "axios";

const KakaoMap = () => {
  const kakaoApiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
  const mapRef = useRef(null);
  const [center, setCenter] = useState({ lat: 33.487182768, lng: 126.531717176 });
  const [currentPosition, setCurrentPosition] = useState(null);
  const [level, setLevel] = useState(3);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [facilities, setFacilities] = useState([]); // 마커 데이터
  const [pickupRequests, setPickupRequests] = useState([]); // 배출 대행 요청 데이터 추가

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestGroup, setSelectedRequestGroup] = useState(null); // 같은 위치 요청 그룹
  
  const [showFacilities, setShowFacilities] = useState(true);  // 클린하우스, 재활용센터 보기 여부
  const [showPickupRequests, setShowPickupRequests] = useState(true);  // 배출 대행 요청 보기 여부

  const goormSquare = { lat: 33.487182768, lng: 126.531717176 };

  // 카카오맵 SDK 로딩 확인
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services,clusterer`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  // // 현재 위치 가져오기 htts에서만 geolocation 이용 가능
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentPosition({ lat: latitude, lng: longitude });
  //         setCenter({ lat: latitude, lng: longitude });
  //       },
  //       (error) => {
  //         console.error("Error getting current position:", error);
  //       }
  //     );
  //   }
  // }, []);


    // 구름스퀘어 위치로 이동하는 함수
    const moveToGoormSquare = () => {
      if (mapRef.current) {
        // 카카오맵 인스턴스 직접 조작
        const moveLatLng = new window.kakao.maps.LatLng(
          goormSquare.lat,
          goormSquare.lng
        );
        
        // 지도 이동 (패닝 애니메이션 적용)
        mapRef.current.setCenter(moveLatLng);
        mapRef.current.setLevel(3);
        
        // React 상태도 업데이트 (UI 동기화 위해)
        setCenter(goormSquare);
      }
    };
    
    
  // 지도 바운더리가 변경될 때 API 요청
  const fetchFacilities = async (bounds) => {
    try {
      const response = await axios.get(
        `http://3.37.88.60/api/locations/bounds/?minLat=${bounds.swLat}&maxLat=${bounds.neLat}&minLng=${bounds.swLng}&maxLng=${bounds.neLng}`
      );
      setFacilities(response.data.data);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  // 지도 이동 시 바운더리 변경 감지
  const handleBoundsChanged = (map) => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest(); // 남서쪽 좌표
    const ne = bounds.getNorthEast(); // 북동쪽 좌표

    const newBounds = {
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
    };

    if (showFacilities) fetchFacilities(newBounds); // 클린하우스, 재활용센터 데이터 가져오기
    if (showPickupRequests) fetchPickupRequests(newBounds); // 배출 대행 요청 데이터 가져오기
};


  // 마커 아이콘 설정 (시설 유형에 따라 구분)
const getMarkerImage = (type) => {
  switch (type) {
    case "cleanhouse":
      return {
        src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
        size: { width: 24, height: 35 },
      };
    case "recycling":
      return {
        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        size: { width: 24, height: 35 },
      };
    default:
      return null;
  }
};

  // 지도 인스턴스 설정 함수
  const setMapInstance = (map) => {
    mapRef.current = map;
  };

  const handleKakaoMap = (e) => {
    console.log(selectedFacility);
    if (!selectedFacility || !currentPosition) {
      alert("현재 위치 또는 선택한 시설 정보가 없습니다.");
      return;
    }

    // 도착지 이름
    const destinationName = selectedFacility.name || (selectedFacility.type === "cleanhouse" ? "클린하우스" : "재활용도움센터");
    
    // 도착지 좌표
    const destinationX = selectedFacility.longitude;
    const destinationY = selectedFacility.latitude;

    const kakaoMapUrl = `https://map.kakao.com/link/to/${destinationName},${destinationY},${destinationX}`;
    console.log(kakaoMapUrl);
    // 새 창에서 카카오맵 열기
    window.open(kakaoMapUrl, '_blank');
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        지도 로딩 중...
      </div>
    );
  }

const fetchPickupRequests = async (bounds) => {
  try {
      const response = await axios.get(
          `http://3.37.88.60/api/pickup/active/bounds?minLat=${bounds.swLat}&maxLat=${bounds.neLat}&minLng=${bounds.swLng}&maxLng=${bounds.neLng}`
      );
      setPickupRequests(response.data.data);
  } catch (error) {
      console.error("Error fetching pickup requests:", error);
  }
};

// 같은 위치에 있는 요청을 그룹화
const groupedPickupRequests = pickupRequests.reduce((acc, request) => {
  const key = `${request.latitude}-${request.longitude}`;
  if (!acc[key]) acc[key] = [];
  acc[key].push(request);
  return acc;
}, {});

// 마커 클릭 시 해당 위치의 모든 요청을 표시
const handleRequestMarkerClick = (lat, lng) => {
  const key = `${lat}-${lng}`;
  const requests = groupedPickupRequests[key];

  if (requests.length > 1) {
      // 같은 위치의 요청이 여러 개 있는 경우
      setSelectedRequestGroup(requests);
      setSelectedRequest(null);
  } else {
      // 단일 요청일 경우
      setSelectedRequest(requests[0]);
      setSelectedRequestGroup(null);
  }
};

// 지도 클릭 시 오버레이 닫기
const handleMapClick = () => {
  setSelectedRequest(null);
  setSelectedRequestGroup(null);
};


  return (
    <div className="w-full h-full">
      <Map
        center={center}
        level={level}
        style={{ width: "100%", height: "100vh" }}
        onZoomChanged={(map) => setLevel(map.getLevel())}
        onBoundsChanged={handleBoundsChanged} // 지도 이동 시 바운더리 변경 감지
        onCreate={setMapInstance}
        onClick={handleMapClick}
      >

        <MarkerClusterer
          averageCenter
          minLevel={5}
          styles={[
            {
              width: "40px", // 클러스터 크기
              height: "40px",
              background: "rgba(51, 102, 204, 0.8)",
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "40px",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
            },
          ]}

        >
          {facilities.map((facility) => (
            <MapMarker
              key={facility.id}
              position={{ lat: facility.latitude, lng: facility.longitude }}
              image={getMarkerImage(facility.type)}
              onClick={() => setSelectedFacility(facility)}/>
          ))}
        </MarkerClusterer>

        {/* 현재 위치 마커 */}
        {currentPosition && (
          <CustomOverlayMap position={currentPosition}>
            <div className="relative">
              {/* <div style={{ padding: "5px", color: "black", backgroundColor: "white", borderRadius: "16px" }}>
                {"현재 내 위치"}
              </div> */}
              <div className="w-6 h-6 bg-red-400 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </CustomOverlayMap>
        )}

        {/* 선택된 시설 정보 표시 */}
        {selectedFacility && (
          <CustomOverlayMap
            position={{
              lat: selectedFacility.latitude,
              lng: selectedFacility.longitude,
            }}
            yAnchor={1.5}
          >
            <div className="p-3 bg-white rounded-lg shadow-md text-center">
              <h3 className="font-bold text-md mb-2">
                {selectedFacility.type === "cleanhouse" ? "📍 클린하우스" : "📍 재활용도움센터"}
              </h3>
              <p className="text-xs">{selectedFacility.address}</p>
              <p className="text-xs">운영 시간: {selectedFacility.operation_hours}</p>
              <button className='bg-yellow-400 text-white px-2 py-1 rounded-md text-xs mt-2 font-bold' onClick={handleKakaoMap}>카카오로 길찾기</button>
            </div>
          </CustomOverlayMap>
        )}

        {/* 배출 대행 요청 마커 */}
        {showPickupRequests &&
            Object.values(groupedPickupRequests).map((group) => (
                <MapMarker
                    key={`${group[0].latitude}-${group[0].longitude}`}
                    position={{ lat: group[0].latitude, lng: group[0].longitude }}
                    image={{
                        src: "/images/marker-red.png",  // 배출 요청 마커 아이콘
                        size: { width: 24, height: 35 },
                    }}
                    onClick={() => handleRequestMarkerClick(group[0].latitude, group[0].longitude)}
                />
            ))
        }
      </Map>

      {/* 현재 위치로 이동 버튼 */}
      <button
        className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center z-10"
        onClick={moveToGoormSquare}
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
