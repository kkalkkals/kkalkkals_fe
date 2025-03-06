// src/pages/RequestFormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "../styles/requestForm.css";
import axios from "axios";

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [formData, setFormData] = useState({
    trash_type: [],
    trash_amount: "",
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
    <div className="form-container">
      <Header title="대행 요청하기" showBack={true} />
      
      <div className="form-content">
        <div className="form-section">
          <h2 className="section-title">쓰레기 종류</h2>
          <div className="trash-types-grid">
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('월: 플라스틱류')}
                  onChange={() => handleCheckboxChange('월: 플라스틱류')}
                />
                월: 플라스틱류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('토: 불에 안타는')}
                  onChange={() => handleCheckboxChange('토: 불에 안타는')}
                />
                토: 불에 안타는<br />쓰레기·병류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('화: 종이류')}
                  onChange={() => handleCheckboxChange('화: 종이류')}
                />
                화: 종이류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('수: 캔·고철류')}
                  onChange={() => handleCheckboxChange('수: 캔·고철류')}
                />
                수: 캔·고철류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('목: 스티로폼·비닐류')}
                  onChange={() => handleCheckboxChange('목: 스티로폼·비닐류')}
                />
                목: 스티로폼·비닐류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('금: 플라스틱류')}
                  onChange={() => handleCheckboxChange('금: 플라스틱류')}
                />
                금: 플라스틱류
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('일반쓰레기')}
                  onChange={() => handleCheckboxChange('일반쓰레기')}
                />
                일반쓰레기
              </label>
            </div>
            <div className="trash-type-option">
              <label className="trash-type-label">
                <input
                  type="checkbox"
                  className="trash-type-checkbox"
                  checked={formData.trash_type.includes('음식물쓰레기')}
                  onChange={() => handleCheckboxChange('음식물쓰레기')}
                />
                음식물쓰레기
              </label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">쓰레기 종량(L)</h2>
          <p className="section-description">10L 까지 기본 요금이며, 이후 1L 당 추가 요금이 발생합니다.</p>
          <p className="section-description2">기본 요금: 2,500원, 1L당 추가 요금: 200원</p>
          <input
            type="text"
            className="form-input"
            name="trash_amount"
            placeholder="숫자만 입력해주세요"
            value={formData.trash_amount}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h2 className="section-title">수거 요청 주소</h2>
          <input
            type="text"
            className="form-input"
            name="address"
            placeholder="도로명 주소로 입력해주세요"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h2 className="section-title">수거자에게 전할 말</h2>
          <textarea
            className="form-textarea"
            name="request_term"
            placeholder="주의사항을 적어주세요"
            value={formData.request_term}
            maxLength={20}
            onChange={handleInputChange}
          />
          <div className="character-count">{charCount}/20</div>
        </div>

        <div className="form-section">
          <h2 className="section-title">쓰레기 사진 첨부</h2>
          <input
            type="file"
            id="image-upload"
            className="file-input-hidden"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          <label htmlFor="image-upload" className="file-upload-button">
            사진 첨부
          </label>
          {formData.image && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="쓰레기 사진"
                className="preview-image"
              />
            </div>
          )}
        </div>

        <div className="form-footer">
          <div className="total-price">
            <span className="price-label">총액</span>
            <span className="price-value">{calculatePrice(formData.trash_amount)}원</span>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            요청하기
          </button>
        </div>
      </div>

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
  if (!amount) return 2500;
  const baseAmount = 10;
  const basePrice = 2500;
  const additionalPrice = 200;
  
  const numAmount = parseInt(amount);
  if (numAmount <= baseAmount) return basePrice;
  return basePrice + (numAmount - baseAmount) * additionalPrice;
};

export default RequestFormPage;
