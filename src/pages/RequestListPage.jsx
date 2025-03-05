import React, { useState } from 'react';
import Header from '../components/common/Header';
import RequestCard from '../components/request/RequestCard';
import RequestFilter from '../components/request/RequestFilter';
import Modal from '../components/common/Modal';

// 임시 데이터
const requestsData = [
  {
    id: 1,
    date: '2025-03-06',
    status: '요청중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null,
  },
  {
    id: 2,
    date: '2025-03-06',
    status: '요청중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null,
  },
  {
    id: 3,
    date: '2025-03-06',
    status: '수거중',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null,
  },
  {
    id: 4,
    date: '2025-03-06',
    status: '완료됨',
    trashType: '일반쓰레기, 유리류',
    trashAmount: '20L',
    location: '제주시 구남동 1길 12',
    requestDetails: '유리 수거 하실 때 조심하세요!',
    image: null,
  },
];

const RequestListPage = () => {
  const [activeFilter, setActiveFilter] = useState('최신순');
  const [requests, setRequests] = useState(requestsData);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowFilterModal(false);
    // 필터 로직 구현
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="배출 대행" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                fill="#000"
              />
            </svg>
            {activeFilter}
          </button>

          <div className="flex items-center">
            <input type="checkbox" id="show-completed" className="mr-1" />
            <label htmlFor="show-completed" className="text-sm">
              배출 완료된 건 보기
            </label>
          </div>
        </div>

        {requests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>

      {/* 필터 모달 */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="정렬"
        showCancel={false}
      >
        <div className="flex flex-col">
          <button
            className={`p-2 text-left ${
              activeFilter === '최신순' ? 'text-sky-500 font-bold' : ''
            }`}
            onClick={() => handleFilterChange('최신순')}
          >
            최신순
          </button>
          <button
            className={`p-2 text-left ${
              activeFilter === '오래된순' ? 'text-sky-500 font-bold' : ''
            }`}
            onClick={() => handleFilterChange('오래된순')}
          >
            오래된순
          </button>
        </div>
      </Modal>

      {/* 수락 확인 모달 */}
      <Modal
        isOpen={showCompletedModal}
        onClose={() => setShowCompletedModal(false)}
        title="요청을 수락하시겠습니까?"
        message="수락 후, 2번이상 수거 하지 않을 시 이용이 제한됩니다."
        confirmText="수락"
        onConfirm={() => console.log('요청 수락됨')}
      />

      {/* 쓰레기 배출 완료 모달 */}
      <Modal
        isOpen={showDeletedModal}
        onClose={() => setShowDeletedModal(false)}
        title="쓰레기 배출이 완료되었나요?"
        message="환경을 위한 한 걸음! 당신의 한 걸음이 제주를 깨끗하게 만들었어요!"
        confirmText="네"
        cancelText="아니오"
        onConfirm={() => console.log('배출 완료 확인')}
      />
    </div>
  );
};

export default RequestListPage;
