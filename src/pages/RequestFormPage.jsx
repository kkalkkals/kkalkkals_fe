// src/pages/RequestFormPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TabMenu from '../components/tabs/TabMenu';
import './RequestFormPage.css';

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    trashTypes: [],
    trashAmount: '10',
    location: '',
    requestDetails: '',
    image: null
  });

  // 쓰레기 종류 옵션
  const trashTypeOptions = [
    { id: 'paper', label: '휴: 플라스틱류' },
    { id: 'glass', label: '금: 스티로폼·비닐류' },
    { id: 'plastic', label: '화: 종이류' },
    { id: 'metal', label: '토: 불에 타는 쓰레기·병류' },
    { id: 'general', label: '목: 스티로폼' },
    { id: 'food', label: '일: 스티로폼' },
    { id: 'bulky', label: '일반쓰레기' },
    { id: 'foodWaste', label: '음식물쓰레기' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTrashTypeToggle = (typeId) => {
    setFormData(prev => {
      const isSelected = prev.trashTypes.includes(typeId);
      if (isSelected) {
        return {
          ...prev,
          trashTypes: prev.trashTypes.filter(id => id !== typeId)
        };
      } else {
        return {
          ...prev,
          trashTypes: [...prev.trashTypes, typeId]
        };
      }
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = 2500;
    const amountNum = parseInt(formData.trashAmount) || 0;
    
    // 10L 이하는 기본 요금만 적용
    if (amountNum <= 10) {
      return basePrice;
    }
    
    // 10L 초과분에는 1L당 200원 추가
    const extraAmount = amountNum - 10;
    const extraPrice = extraAmount * 200;
    
    return basePrice + extraPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const submitRequest = () => {
    // API 호출 대신 로컬 처리
    console.log('요청 데이터:', formData);
    
    // 요청 목록 페이지로 이동
    navigate('/request-list');
  };

  return (
    <div className="form-container">
      <Header title="대행 요청하기" />
      
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h2 className="section-title">쓰레기 종류</h2>
          <div className="trash-types-grid">
            {trashTypeOptions.map(type => (
              <div 
                key={type.id}
                onClick={() => handleTrashTypeToggle(type.id)}
                className={`trash-type-option ${
                  formData.trashTypes.includes(type.id) ? 'trash-type-selected' : ''
                }`}
              >
                <label className="trash-type-label">
                  <input
                    type="checkbox"
                    checked={formData.trashTypes.includes(type.id)}
                    onChange={() => {}}
                    className="trash-type-checkbox"
                  />
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-title">쓰레기 총량(L)</h2>
          <p className="section-description">
            최소 신청량은 10L이며, 10L 이하라도 기본 요금이 적용됩니다.
            <br />기본 요금: 2,500원, 1L당 초과요금: 200원
          </p>
          <input
            type="text"
            name="trashAmount"
            value={formData.trashAmount}
            onChange={handleInputChange}
            placeholder="숫자만 입력해주세요"
            className="form-input"
          />
        </div>
        
        <div className="form-section">
          <h2 className="section-title">수거 요청 주소</h2>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="도로명 주소로 입력해주세요"
            className="form-input"
          />
        </div>
        
        <div className="form-section">
          <h2 className="section-title">수거자에게 전할 말</h2>
          <textarea
            name="requestDetails"
            value={formData.requestDetails}
            onChange={handleInputChange}
            placeholder="주의사항을 적어주세요"
            className="form-textarea"
          />
          <div className="character-count">
            {formData.requestDetails.length}/20
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-title">쓰레기 사진 첨부</h2>
          <div className="image-preview">
            {formData.image ? (
              <img 
                src={URL.createObjectURL(formData.image)} 
                alt="Uploaded trash" 
                className="preview-image"
              />
            ) : (
              <span className="image-placeholder">사진 첨부</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input-hidden"
            id="image-upload"
          />
          <label 
            htmlFor="image-upload"
            className="file-upload-button"
          >
            사진 업로드
          </label>
        </div>
        
        <div className="form-footer">
          <div className="total-price">
            <span className="price-label">총액:</span>
            <span className="price-value">{calculateTotalPrice().toLocaleString()}원</span>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
          >
            요청하기
          </button>
        </div>
      </form>
      
      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">요청을 확인하시겠습니까?</h2>
            <p className="modal-content">
              요청 후 취소는 가능하지만, 수거자가 수락한 후에는 취소가 불가능합니다.
            </p>
            <div className="modal-buttons">
              <button 
                className="modal-button-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                취소
              </button>
              <button 
                className="modal-button-confirm"
                onClick={() => {
                  submitRequest();
                  setShowConfirmModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      
      <TabMenu activeTab="request-form" />
    </div>
  );
};

export default RequestFormPage;