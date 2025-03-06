// src/pages/RequestFormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "../styles/requestDetail.css";
import axios from "axios";

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [amountText, setAmountText] = useState(`
    최소 신청량은 10L이며, 10L 이하라도 기본 요금이 적용됩니다.
  `);
  const [amountText2, setAmountText2] = useState(`
    기본 요금: 2,500원, 1L당 초과요금: 200원
  `);

  const isFormValid = () => {
    return (
      formData.trash_type.length > 0 &&
      formData.trash_amount.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.request_term.trim() !== "" &&
      formData.image !== null
    );
  };

  const [formData, setFormData] = useState({
    trash_type: [],
    trash_amount: "10",
    address: "",
    request_term: "",
    image: null,
    money: 2500,
  });

  const handleCheckboxChange = (type) => {
    const updatedTypes = formData.trash_type.includes(type)
      ? formData.trash_type.filter(t => t !== type)
      : [...formData.trash_type, type];
    setFormData({ ...formData, trash_type: updatedTypes });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'request_term') {
      setCharCount(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://3.37.88.60/posts", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200) {
        navigate("/request-list");
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <div className="detail-container">
      <Header title="대행 요청하기" showBack={true} />
      
      <div className="detail-content">
        <h2 className="section-title">쓰레기 종류</h2>
        <div className="trash-type-grid">
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('왕: 플라스틱류')}
              onChange={() => handleCheckboxChange('왕: 플라스틱류')}
            />
            <span className="trash-type-label">왕: 플라스틱류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('토: 물에 안타는')}
              onChange={() => handleCheckboxChange('토: 물에 안타는')}
            />
            <span className="trash-type-label">토: 물에 안타는<br />쓰레기/병류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('화: 종이류')}
              onChange={() => handleCheckboxChange('화: 종이류')}
            />
            <span className="trash-type-label">화: 종이류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('수: 캔/고철류')}
              onChange={() => handleCheckboxChange('수: 캔/고철류')}
            />
            <span className="trash-type-label">수: 캔/고철류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('목: 스티로폼/비닐류')}
              onChange={() => handleCheckboxChange('목: 스티로폼/비닐류')}
            />
            <span className="trash-type-label">목: 스티로폼/비닐류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('금: 플라스틱류')}
              onChange={() => handleCheckboxChange('금: 플라스틱류')}
            />
            <span className="trash-type-label">금: 플라스틱류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('일반쓰레기')}
              onChange={() => handleCheckboxChange('일반쓰레기')}
            />
            <span className="trash-type-label">일반쓰레기</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={formData.trash_type.includes('음식물쓰레기')}
              onChange={() => handleCheckboxChange('음식물쓰레기')}
            />
            <span className="trash-type-label">음식물쓰레기</span>
          </div>
        </div>

        <h2 className="section-title">쓰레기 종량(L)</h2>
        <p className="amount-info">
          10L 까지 기본 요금이며, 이후 1L 당 추가 요금이 발생합니다.<br />
          기본 요금: 2,500원, 1L당 추가 요금: 200원
        </p>
        <input
          type="text"
          className="amount-input"
          name="trash_amount"
          placeholder="숫자만 입력해주세요"
          value={formData.trash_amount}
          onChange={handleInputChange}
        />

        <h2 className="section-title">수거 요청 주소</h2>
        <input
          type="text"
          className="location-input"
          name="address"
          placeholder="도로명 주소로 입력해주세요"
          value={formData.address}
          onChange={handleInputChange}
        />

        <h2 className="section-title">수거자에게 전할 말</h2>
        <textarea
          className="message-input"
          name="request_term"
          placeholder="주의사항을 적어주세요"
          value={formData.request_term}
          maxLength={20}
          onChange={handleInputChange}
        />
        <div className="character-count">{charCount}/20</div>

        <h2 className="section-title">쓰레기 사진 첨부</h2>
        <h3 className="section-subtitle">사진 첨부</h3>
        <div className="image-preview">
          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="쓰레기 사진"
              className="preview-image"
            />
          ) : (
            <div className="image-placeholder">
              사진 첨부
            </div>
          )}
        </div>

        <div className="total-price">
          총액: {calculatePrice(formData.trash_amount)}원
        </div>

        <button className="submit-button" onClick={handleSubmit}>
          요청하기
        </button>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">요청을 확인하시겠습니까?</h2>
            <p className="modal-content">
              요청 후 취소는 가능하지만, 수거자가 수락한 후에는 취소가
              불가능합니다.
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
    </div>
  );
};

const calculatePrice = (amount) => {
  if (!amount) return 5000;
  const baseAmount = 10;
  const basePrice = 2500;
  const additionalPrice = 200;
  
  const numAmount = parseInt(amount);
  if (numAmount <= baseAmount) return basePrice;
  return basePrice + (numAmount - baseAmount) * additionalPrice;
};

export default RequestFormPage;
