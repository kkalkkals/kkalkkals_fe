import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TabMenu from '../components/tabs/TabMenu';
import '../styles/requestList.css';

// 임시 데이터
const dummyRequests = [
  {
    id: 1,
    date: '2025-03-05',
    status: '요청중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null
  },
  {
    id: 2,
    date: '2025-03-02',
    status: '요청중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null
  },
  {
    id: 3,
    date: '2025-03-06',
    status: '수거중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null
  },
  {
    id: 4,
    date: '2025-03-06',
    status: '완료됨',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null
  }
];

const RequestListPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('최신순');
  const [showCompleted, setShowCompleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // API 호출 대신 임시 데이터 사용
    setRequests(dummyRequests);
  }, []);

  // 필터링된 요청 목록
  const filteredRequests = () => {
    let filtered = [...requests];
    
    // 완료된 항목 필터링
    if (!showCompleted) {
      filtered = filtered.filter(request => 
        request.status !== '완료됨' && request.status !== '취소됨'
      );
    }
    
    // 정렬
    if (filter === '최신순') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    return filtered;
  };

  // 상태 배지 스타일 클래스명 반환
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case '요청중':
        return 'status-badge status-pending';
      case '수거중':
        return 'status-badge status-collecting';
      case '완료됨':
        return 'status-badge status-completed';
      case '취소됨':
        return 'status-badge status-canceled';
      default:
        return 'status-badge status-default';
    }
  };

  return (
    <div className="list-container">
      <div className="relative">
        <Header 
          title="배출 대행" 
          showBack={true}
          showMenu={false}
        />
        <div className="absolute right-4 top-3">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-white text-2xl"
          >
            ☰
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              <button
                onClick={() => {
                  navigate('/');
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="text-gray-700">지도</span>
              </button>
              <button
                onClick={() => {
                  navigate('/guide');
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-t border-gray-100"
              >
                <span className="text-gray-700">클린하우스란?</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="list-content">
        <div className="show-completed-toggle mt-4 px-4">
          <input 
            type="checkbox" 
            id="show-completed" 
            className="toggle-checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          <label htmlFor="show-completed" className="toggle-label">
            배출 완료된 건 보기
          </label>
        </div>
        
        {filteredRequests().map(request => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="date-badge">
                {request.date}
              </div>
              <span className={getStatusBadgeClass(request.status)}>
                {request.status}
              </span>
            </div>
            
            <div className="request-details">
              <p className="detail-item">쓰레기 종류: {request.trashType}</p>
              <p className="detail-item">쓰레기 총량(L): {request.trashAmount}</p>
              <p className="detail-item">수거 위치: {request.location}</p>
              <p className="detail-item">수거 요청사항: {request.requestDetails}</p>
            </div>
            
            <div className="request-footer">
              <div className="request-image"></div>
              
              <div className="action-buttons">
                {request.status === '요청중' && (
                  <button 
                    onClick={() => navigate(`/request/${request.id}`)}
                    className="accept-button"
                  >
                    수락하기
                  </button>
                )}
                
                {request.status === '수거중' && (
                  <button 
                    onClick={() => navigate(`/request/${request.id}`)}
                    className="complete-button"
                  >
                    대행완료
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <TabMenu activeTab="request-list" />
    </div>
  );
};

export default RequestListPage;