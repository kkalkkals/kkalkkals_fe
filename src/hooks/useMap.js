import { useState, useEffect } from 'react';

const useMap = (initialCenter = { lat: 33.450701, lng: 126.570667 }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    }
  }, []);

  const addMarker = (marker) => {
    setMarkers((prev) => [...prev, marker]);
  };

  const removeMarker = (markerId) => {
    setMarkers((prev) => prev.filter((marker) => marker.id !== markerId));
  };

  const selectMarker = (marker) => {
    setSelectedMarker(marker);
  };

  const clearMarkers = () => {
    setMarkers([]);
    setSelectedMarker(null);
  };

  return {
    map,
    setMap,
    center,
    setCenter,
    level,
    setLevel,
    markers,
    addMarker,
    removeMarker,
    selectedMarker,
    selectMarker,
    clearMarkers,
  };
};

export default useMap;
