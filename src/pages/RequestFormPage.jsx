// src/pages/RequestFormPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import TabMenu from '../components/tabs/TabMenu';

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
    <div className="min-h-screen bg-white pb-16">
      <Header title="대행 요청하기" />
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-6">
          <h2 className="font-bold mb-2">쓰레기 종류</h2>
          <div className="grid grid-cols-2 gap-3">
            {trashTypeOptions.map(type => (
              <div 
                key={type.id}
                onClick={() => handleTrashTypeToggle(type.id)}
                className={`border rounded-lg p-3 text-center cursor-pointer ${
                  formData.trashTypes.includes(type.id) ? 'bg-sky-100 border-sky-400' : ''
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.trashTypes.includes(type.id)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2">쓰레기 총량(L)</h2>
          <p className="text-sm text-gray-500 mb-2">
            최소 신청량은 10L이며, 10L 이하라도 기본 요금이 적용됩니다.
            <br />기본 요금: 2,500원, 1L당 초과요금: 200원
          </p>
          <input
            type="text"
            name="trashAmount"
            value={formData.trashAmount}
            onChange={handleInputChange}
            placeholder="숫자만 입력해주세요"
            className="w-full border rounded-lg p-3"
          />
        </div>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2">수거 요청 주소</h2>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="도로명 주소로 입력해주세요"
            className="w-full border rounded-lg p-3"
          />
        </div>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2">수거자에게 전할 말</h2>
          <textarea
            name="requestDetails"
            value={formData.requestDetails}
            onChange={handleInputChange}
            placeholder="주의사항을 적어주세요"
            className="w-full border rounded-lg p-3 h-24"
          />
          <div className="text-right text-sm text-gray-500">
            {formData.requestDetails.length}/20
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="font-bold mb-2">쓰레기 사진 첨부</h2>
          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
            {formData.image ? (
              <img 
                src={URL.createObjectURL(formData.image)} 
                alt="Uploaded trash" 
                className="max-h-full"
              />
            ) : (
              <span className="text-gray-400">사진 첨부</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label 
            htmlFor="image-upload"
            className="block text-center border rounded-lg p-3 cursor-pointer"
          >
            사진 업로드
          </label>
        </div>
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">총액:</span>
            <span className="font-bold">{calculateTotalPrice().toLocaleString()}원</span>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-sky-400 text-white rounded-md font-medium"
          >
            요청하기
          </button>
        </div>
      </form>
      
      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">요청을 확인하시겠습니까?</h2>
            <p className="text-center mb-6">
              요청 후 취소는 가능하지만, 수거자가 수락한 후에는 취소가 불가능합니다.
            </p>
            <div className="flex gap-3">
              <button 
                className="flex-1 py-2 bg-gray-300 rounded"
                onClick={() => setShowConfirmModal(false)}
              >
                취소
              </button>
              <button 
                className="flex-1 py-2 bg-sky-400 text-white rounded"
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