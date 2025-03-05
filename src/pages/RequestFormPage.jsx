import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import RequestForm from '../components/request/RequestForm';
import Modal from '../components/common/Modal';

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setShowConfirmModal(true);
  };

  const confirmRequest = () => {
    // API 요청 로직
    console.log('요청 데이터:', formData);
    navigate('/request-list');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="대행 요청하기" />
      <RequestForm onSubmit={handleSubmit} />

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="요청을 확인하시겠습니까?"
        message="요청 후 취소는 가능하지만, 수거자가 수락한 후에는 취소가 불가능합니다."
        confirmText="확인"
        onConfirm={confirmRequest}
      />
    </div>
  );
};

export default RequestFormPage;
