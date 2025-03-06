// src/pages/RequestListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TabMenu from '../components/tabs/TabMenu';

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  // 상태 배지 스타일
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case '요청중':
        return 'bg-indigo-500 text-white';
      case '수거중':
        return 'bg-green-500 text-white';
      case '완료됨':
        return 'bg-gray-400 text-white';
      case '취소됨':
        return 'bg-red-400 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header title="배출 대행" />
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="#000"/>
            </svg>
            {filter}
          </button>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="show-completed" 
              className="mr-1"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            <label htmlFor="show-completed" className="text-sm">
              배출 완료된 건 보기
            </label>
          </div>
        </div>
        
        {filteredRequests().map(request => (
          <div key={request.id} className="border rounded-lg p-4 mb-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-black text-white py-1 px-2 rounded text-sm">
                {request.date}
              </div>
              <span className={`py-1 px-3 rounded-full text-sm ${getStatusBadgeStyle(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="mb-2">쓰레기 종류: {request.trashType}</p>
              <p className="mb-2">쓰레기 총량(L): {request.trashAmount}</p>
              <p className="mb-2">수거 위치: {request.location}</p>
              <p className="mb-2">수거 요청사항: {request.requestDetails}</p>
            </div>
            
            <div className="flex justify-between">
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              
              <div className="flex items-end">
                {request.status === '요청중' && (
                  <button 
                    onClick={() => navigate(`/request/${request.id}`)}
                    className="bg-sky-400 text-white py-2 px-4 rounded"
                  >
                    수락하기
                  </button>
                )}
                
                {request.status === '수거중' && (
                  <button 
                    onClick={() => navigate(`/request/${request.id}`)}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                    대행완료
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">정렬</h2>
            <div className="flex flex-col">
              <button 
                className={`p-2 text-left ${filter === '최신순' ? 'text-sky-500 font-bold' : ''}`}
                onClick={() => {
                  setFilter('최신순');
                  setIsFilterModalOpen(false);
                }}
              >
                최신순
              </button>
              <button
                className={`p-2 text-left ${filter === '오래된순' ? 'text-sky-500 font-bold' : ''}`}
                onClick={() => {
                  setFilter('오래된순');
                  setIsFilterModalOpen(false);
                }}
              >
                오래된순
              </button>
            </div>
            <button 
              className="w-full mt-4 py-2 bg-gray-200 rounded"
              onClick={() => setIsFilterModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      
      <TabMenu activeTab="request-list" />
    </div>
  );
};

export default RequestListPage;