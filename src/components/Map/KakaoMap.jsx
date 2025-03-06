import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker, CustomOverlayMap, MarkerClusterer } from "react-kakao-maps-sdk";
import axios from "axios";
import SearchBar from "./SearchBar";
import Hamburger from '../common/Hamburger';
import RequestModal from "../request/RequestModal";

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

    // 필터 상태
  const [showCleanhouse, setShowCleanhouse] = useState(true);
  const [showRecycling, setShowRecycling] = useState(true);
  const [showPickupRequests, setShowPickupRequests] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRequestGroup, setSelectedRequestGroup] = useState(null); // 같은 위치 요청 그룹
  
  const [showFacilities, setShowFacilities] = useState(true);  // 클린하우스, 재활용센터 보기 여부
  // const [showPickupRequests, setShowPickupRequests] = useState(true);  // 배출 대행 요청 보기 여부

  const goormSquare = { lat: 33.487182768, lng: 126.531717176 };

  const [modalRequests, setModalRequests] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);


  // 필터 버튼 이미지
  const filterButtons = [
    {
      name: "클린하우스",
      state: showCleanhouse,
      toggle: () => setShowCleanhouse((prev) => !prev),
      img: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
    },
    {
      name: "재활용센터",
      state: showRecycling,
      toggle: () => setShowRecycling((prev) => !prev),
      img: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
    },
    {
      name: "대행 요청",
      state: showPickupRequests,
      toggle: () => setShowPickupRequests((prev) => !prev),
      img: "/images/marker-red.png",
    },
  ];
  
  // 제주도 읍면동 데이터
  const jejuDistricts = [
    { name: "제주시 한림읍", lat: 33.4089, lng: 126.2690, level: 7 },
    { name: "제주시 애월읍", lat: 33.4631, lng: 126.3312, level: 7 },
    { name: "제주시 구좌읍", lat: 33.5519, lng: 126.7159, level: 7 },
    { name: "제주시 조천읍", lat: 33.5375, lng: 126.6341, level: 7 },
    { name: "제주시 한경면", lat: 33.3435, lng: 126.1726, level: 7 },
    { name: "제주시 추자면", lat: 33.9471, lng: 126.3095, level: 7 },
    { name: "제주시 우도면", lat: 33.5032, lng: 126.9521, level: 7 },
    { name: "제주시 일도1동", lat: 33.5138, lng: 126.5230, level: 5 },
    { name: "제주시 일도2동", lat: 33.5099, lng: 126.5294, level: 5 },
    { name: "제주시 이도1동", lat: 33.5099, lng: 126.5230, level: 5 },
    { name: "제주시 이도2동", lat: 33.5001, lng: 126.5294, level: 5 },
    { name: "제주시 삼도1동", lat: 33.5138, lng: 126.5166, level: 5 },
    { name: "제주시 삼도2동", lat: 33.5099, lng: 126.5166, level: 5 },
    { name: "제주시 용담1동", lat: 33.5138, lng: 126.5102, level: 5 },
    { name: "제주시 용담2동", lat: 33.5099, lng: 126.5102, level: 5 },
    { name: "제주시 건입동", lat: 33.5177, lng: 126.5294, level: 5 },
    { name: "제주시 화북동", lat: 33.5256, lng: 126.5358, level: 5 },
    { name: "제주시 삼양동", lat: 33.5256, lng: 126.5486, level: 5 },
    { name: "제주시 봉개동", lat: 33.4982, lng: 126.5934, level: 5 },
    { name: "제주시 아라동", lat: 33.4825, lng: 126.5486, level: 5 },
    { name: "제주시 오라동", lat: 33.4825, lng: 126.5102, level: 5 },
    { name: "제주시 연동", lat: 33.4904, lng: 126.5038, level: 5 },
    { name: "제주시 노형동", lat: 33.4825, lng: 126.4806, level: 5 },
    { name: "제주시 외도동", lat: 33.4904, lng: 126.4358, level: 5 },
    { name: "제주시 이호동", lat: 33.4982, lng: 126.4550, level: 5 },
    { name: "제주시 도두동", lat: 33.5060, lng: 126.4614, level: 5 },
    { name: "서귀포시 대정읍", lat: 33.2237, lng: 126.2501, level: 7 },
    { name: "서귀포시 남원읍", lat: 33.2765, lng: 126.7159, level: 7 },
    { name: "서귀포시 성산읍", lat: 33.3826, lng: 126.8806, level: 7 },
    { name: "서귀포시 안덕면", lat: 33.2518, lng: 126.3567, level: 7 },
    { name: "서귀포시 표선면", lat: 33.3264, lng: 126.8231, level: 7 },
    { name: "서귀포시 송산동", lat: 33.2518, lng: 126.5614, level: 5 },
    { name: "서귀포시 정방동", lat: 33.2440, lng: 126.5678, level: 5 },
    { name: "서귀포시 중앙동", lat: 33.2518, lng: 126.5678, level: 5 },
    { name: "서귀포시 천지동", lat: 33.2440, lng: 126.5614, level: 5 },
    { name: "서귀포시 효돈동", lat: 33.2518, lng: 126.5934, level: 5 },
    { name: "서귀포시 영천동", lat: 33.2596, lng: 126.5742, level: 5 },
    { name: "서귀포시 동홍동", lat: 33.2596, lng: 126.5806, level: 5 },
    { name: "서귀포시 서홍동", lat: 33.2596, lng: 126.5550, level: 5 },
    { name: "서귀포시 대륜동", lat: 33.2518, lng: 126.5486, level: 5 },
    { name: "서귀포시 대천동", lat: 33.2518, lng: 126.5358, level: 5 },
    { name: "서귀포시 중문동", lat: 33.2518, lng: 126.4230, level: 5 },
    { name: "서귀포시 예래동", lat: 33.2518, lng: 126.3903, level: 5 }
  ];

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

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
  
      // 제주도 경계 설정 (서남쪽, 동북쪽 좌표)
      const sw = new window.kakao.maps.LatLng(33.11, 126.05); // 서남쪽
      const ne = new window.kakao.maps.LatLng(34.00, 127.00); // 동북쪽
      const jejuBounds = new window.kakao.maps.LatLngBounds(sw, ne);
  
      // 지도 초기화 시 제주도 영역으로 제한
      map.setBounds(jejuBounds);
    }
  }, [isLoaded]); // 맵이 로드되었을 때 실행
  
  

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

  const handleMapBoundsLimit = () => {
    if (mapRef.current) {
      const map = mapRef.current;
  
      // 제주도 경계 설정
      const sw = new window.kakao.maps.LatLng(33.11, 126.05); // 서남쪽
      const ne = new window.kakao.maps.LatLng(34.00, 127.00); // 동북쪽
      const jejuBounds = new window.kakao.maps.LatLngBounds(sw, ne);
  
      // 현재 지도 중심 좌표 확인
      const center = map.getCenter();
  
      // 사용자가 제주도를 벗어나면 다시 제주도 중심으로 이동
      if (!jejuBounds.contain(center)) {
        map.setBounds(jejuBounds);
      }
    }
  };


    // 구름스퀘어 위치로 이동하는 함수
    const moveToGoormSquare = () => {
      if (mapRef.current) {
        // 카카오맵 인스턴스 직접 조작
        const moveLatLng = new window.kakao.maps.LatLng(
          goormSquare.lat,
          goormSquare.lng
        );
        
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

  if (requests.length > 0) {
    setModalRequests(requests);  // 요청 개수 관계없이 모달 띄우기
  }
};

const closeModal = () => {
  setModalRequests(null);
};

// {modalRequests && <RequestModal requests={modalRequests} onClose={closeModal} />}


// 지도 클릭 시 오버레이 닫기
const handleMapClick = () => {
  setSelectedFacility(null); // 선택된 시설 정보 초기화
  setSelectedRequest(null);
  setSelectedRequestGroup(null);
};

// 검색어 변경 핸들러
const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  
  if (value.trim() === "") {
    setSearchResults([]);
    setShowSearchResults(false);
    return;
  }
  
  // 검색어에 맞는 동네 필터링
  const filtered = jejuDistricts.filter(district => 
    district.name.toLowerCase().includes(value.toLowerCase())
  );
  
  setSearchResults(filtered);
  setShowSearchResults(true);
};

// 동네 선택 핸들러
const handleDistrictSelect = (district) => {
  // 선택한 동네로 지도 이동
  if (mapRef.current) {
    const moveLatLng = new window.kakao.maps.LatLng(
      district.lat,
      district.lng
    );
    
    mapRef.current.setCenter(moveLatLng);
    mapRef.current.setLevel(district.level); // 동네 크기에 맞게 줌 레벨 설정
    
    setCenter({ lat: district.lat, lng: district.lng });
    setLevel(district.level);
  }
  
  // 검색 UI 초기화
  setSearchTerm(district.name);
  setShowSearchResults(false);
};

  return (
    <div className="w-full h-full relative">
      <div className="absolute flex items-center justify-center top-4 left-1/2 transform -translate-x-1/2 z-10 w-4/5 max-w-md opacity-90">
        <div className="relative flex items-center justify-center">
          <SearchBar 
            onSearch={handleSearchChange}
            districts={jejuDistricts} 
            onDistrictSelect={handleDistrictSelect} 
        />
        <Hamburger className="opacity-90"/>
        </div>
      </div>

      <Map
        center={center}
        level={level}
        style={{ width: "100%", height: "100vh" }}
        onZoomChanged={handleMapBoundsLimit}  // 줌 변경 시 제주도 밖으로 못 나가게
        onDragEnd={handleMapBoundsLimit}  // 드래그 후 제주도 밖으로 못 나가게
        onBoundsChanged={handleBoundsChanged} // 바운드 변경 감지
        onCreate={setMapInstance}
        onClick={handleMapClick}
      >
        {/* 클린하우스 마커 클러스터링 */}
        {showCleanhouse && (
          <MarkerClusterer
            averageCenter
            minLevel={5}
            styles={[{
              width: "40px", height: "40px",
              background: "rgba(35, 140, 250, 0.7)", // 연한 블루
              borderRadius: "50%",
              textAlign: "center", lineHeight: "40px",
              color: "white", fontWeight: "bold", fontSize: "14px",
            }]}
          >
            {facilities
              .filter(facility => facility.type === "cleanhouse")
              .map(facility => (
                <MapMarker
                  key={facility.id}
                  position={{ lat: facility.latitude, lng: facility.longitude }}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png",
                    size: { width: 24, height: 35 },
                  }}
                  onClick={() => setSelectedFacility(facility)}
                />
              ))}
          </MarkerClusterer>
        )}

        {/* 재활용센터 마커 클러스터링 */}
        {showRecycling && (
          <MarkerClusterer
            averageCenter
            minLevel={5}
            styles={[{
              width: "40px", height: "40px",
              background: "rgba(255, 194, 0, 0.7)", // 연한 노랑
              borderRadius: "50%",
              textAlign: "center", lineHeight: "40px",
              color: "white", fontWeight: "bold", fontSize: "14px",
            }]}
          >
            {facilities
              .filter(facility => facility.type === "recycling")
              .map(facility => (
                <MapMarker
                  key={facility.id}
                  position={{ lat: facility.latitude, lng: facility.longitude }}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                    size: { width: 24, height: 35 },
                  }}
                  onClick={() => setSelectedFacility(facility)}
                />
              ))}
          </MarkerClusterer>
        )}

        {/* 배출 요청 마커 클러스터링 */}
        {showPickupRequests && Object.keys(groupedPickupRequests).length > 0 && (
          <MarkerClusterer
            averageCenter
            minLevel={5}
            styles={[{
              width: "40px", height: "40px",
              background: "rgba(255, 61, 0, 0.7)", // 연한 빨강
              borderRadius: "50%",
              textAlign: "center", lineHeight: "40px",
              color: "white", fontWeight: "bold", fontSize: "14px",
            }]}
          >
            {Object.keys(groupedPickupRequests).map((key) => {
              const requestsAtSameLocation = groupedPickupRequests[key]; // 해당 좌표의 요청들
              const firstRequest = requestsAtSameLocation[0]; // 대표 요청만 사용
              return (
                <MapMarker
                  key={key}
                  position={{ lat: firstRequest.latitude, lng: firstRequest.longitude }}
                  image={{
                    src: "/images/marker-red.png",
                    size: { width: 24, height: 35 },
                  }}
                  onClick={() => handleRequestMarkerClick(firstRequest.latitude, firstRequest.longitude)}
                />
              );
            })}
          </MarkerClusterer>
        )}

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

      </Map>
      {/* 필터 & 현재 위치 버튼 컨테이너 */}
      <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-3 z-10">
        {/* 필터 버튼들 */}
        {filterButtons.map((btn, index) => (
          <button
            key={index}
            title={btn.name}
            onClick={() => {
              btn.toggle();
              handleBoundsChanged(mapRef.current);
            }}
            className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md transition ${
              btn.state ? "bg-white" : "bg-gray-300 opacity-50"
            }`}
          >
            <img src={btn.img} alt={btn.name} className="w-6 h-6" />
          </button>
        ))}

        {/* 현재 위치 버튼 */}
        <button
          title="현재 위치"
          className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"
          onClick={() => currentPosition && setCenter(currentPosition)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* 배출 요청 모달 */}
      {modalRequests && <RequestModal requests={modalRequests} onClose={closeModal} />}
    </div>
  );
};

export default KakaoMap;
