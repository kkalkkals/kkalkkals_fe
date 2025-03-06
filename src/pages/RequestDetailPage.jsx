import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import './RequestDetailPage.css';

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    // API 요청으로 데이터 가져오기 (임시 데이터 사용)
    const fetchRequest = async () => {
      // 실제로는 API 호출
      setRequest({
        id,
        date: '2025-03-06',
        status: '요청중',
        trashType: '일반쓰레기, 유리류',
        trashAmount: '20L',
        location: '제주시 구남동 1길 12',
        requestDetails: '유리 수거 하실 때 조심하세요!',
        image: null,
      });
      setLoading(false);
    };

    fetchRequest();
  }, [id]);

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const confirmAccept = () => {
    // API 요청 - 수락 처리
    console.log('요청 수락');
    setRequest((prev) => ({ ...prev, status: '수거중' }));
    navigate('/request-list');
  };

  const handleComplete = () => {
    setShowCompleteModal(true);
  };

  const confirmComplete = () => {
    // API 요청 - 완료 처리
    console.log('대행 완료');
    setRequest((prev) => ({ ...prev, status: '완료됨' }));
    navigate('/request-list');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <Header title="요청 상세" />

      <div className="request-details">
        <div className="request-header">
          <div className="date-badge">
            {request.date}
          </div>
          <div
            className={`status-badge ${
              request.status === '요청중'
                ? 'status-pending'
                : request.status === '수거중'
                ? 'status-inprogress'
                : 'status-completed'
            }`}
          >
            {request.status}
          </div>
        </div>

        <div className="request-content">
          <p className="info-item">
            <span className="info-label">쓰레기 종류:</span> {request.trashType}
          </p>
          <p className="info-item">
            <span className="info-label">쓰레기 총량(L):</span>{' '}
            {request.trashAmount}
          </p>
          <p className="info-item">
            <span className="info-label">수거 위치:</span> {request.location}
          </p>
          <p className="info-item">
            <span className="info-label">수거 요청사항:</span>{' '}
            {request.requestDetails}
          </p>
        </div>

        {request.image && (
          <div className="image-container">
            <h3 className="image-title">첨부 이미지</h3>
            <div className="request-image"></div>
          </div>
        )}
      </div>

      <div className="action-container">
        {request.status === '요청중' && (
          <Button onClick={handleAccept}>수락하기</Button>
        )}
        {request.status === '수거중' && (
          <Button onClick={handleComplete}>대행완료</Button>
        )}
      </div>

      {/* 수락 확인 모달 */}
      <Modal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        title="요청을 수락하시겠습니까?"
        message="수락 후, 2번이상 수거 하지 않을 시 이용이 제한됩니다."
        confirmText="수락"
        cancelText="취소"
        onConfirm={confirmAccept}
      />

      {/* 완료 확인 모달 */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="쓰레기 배출이 완료되었나요?"
        message="환경을 위한 한 걸음! 당신의 한 걸음이 제주를 깨끗하게 만들었어요!"
        confirmText="네"
        cancelText="아니오"
        onConfirm={confirmComplete}
      />
    </div>
  );
};

export default RequestDetailPage;