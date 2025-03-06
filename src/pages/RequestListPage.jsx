import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TabMenu from '../components/tabs/TabMenu';
import '../styles/requestList.css';
import Modal from '../components/common/Modal';

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
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const setIsModalOpen = () => {
  //   setIsModalOpen(!prev); 
  // }
  
    // 모달 상태 관리
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

    const [selectedRequestId, setSelectedRequestId] = useState(null);
  
    // 모달 열기 함수들
    const openAcceptModal = (requestId) => {
      setSelectedRequestId(requestId);
      setIsAcceptModalOpen(true);
    };
  
    const openCompletedModal = (requestId) => {
      setSelectedRequestId(requestId);
      setIsCompletedModalOpen(true);
    };
  
    // 모달 닫기 함수들
    const closeAcceptModal = () => {
      setIsAcceptModalOpen(false);
    };
  
    const closeCompletedModal = () => {
      setIsCompletedModalOpen(false);
    };
    const handleAcceptConfirm = () => {
      console.log('handle accept conform');
    }

    const handleCompleteConfirm = () => {
      console.log('handle complete conform');
    }

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
      <Header title="배출 대행" />
      
      <div className="list-content">
        <div className="filter-bar">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="filter-button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="filter-icon">
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="#000"/>
            </svg>
            {filter}
          </button>
          
          <div className="show-completed-toggle">
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
                    onClick={() => openAcceptModal()}
                    className="accept-button"
                  >
                    수락하기
                  </button>
                )}
                
                {request.status === '수거중' && (
                  <button 
                    onClick={() => openCompletedModal()}
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
      
      {/* 필터 모달 */}
      {isFilterModalOpen && (
        <div className="modal-overlay">
          <div className="filter-modal">
            <h2 className="modal-title">정렬</h2>
            <div className="sort-options">
              <button 
                className={`sort-option ${filter === '최신순' ? 'sort-selected' : ''}`}
                onClick={() => {
                  setFilter('최신순');
                  setIsFilterModalOpen(false);
                }}
              >
                최신순
              </button>
              <button
                className={`sort-option ${filter === '오래된순' ? 'sort-selected' : ''}`}
                onClick={() => {
                  setFilter('오래된순');
                  setIsFilterModalOpen(false);
                }}
              >
                오래된순
              </button>
            </div>
            <button 
              className="close-modal-button"
              onClick={() => setIsFilterModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 수락 확인 모달 */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={closeAcceptModal}
        title="요청을 수락하시겠습니까?"
        children="수락 후, 2번이상 수거 하지 않을 시 이용이 제한됩니다."
        confirmText="수락"
        cancelText="닫기"
        onConfirm={handleAcceptConfirm}
        variant="primary"
      >
      </Modal>
      
      {/* 대행 완료 모달 */}
      <Modal
        isOpen={isCompletedModalOpen}
        onClose={closeCompletedModal}
        title="쓰레기 배출이 완료되었나요?"
        children="환경을 위한 한 걸음! 당신의 한 걸음이 제주를 깨끗하게 만들었어요!"
        confirmText="네"
        cancelText="아니오"
        onConfirm={handleCompleteConfirm}
        variant="primary"
      >
      </Modal>
      
      <TabMenu activeTab="request-list" />
    </div>
  );
};

export default RequestListPage;