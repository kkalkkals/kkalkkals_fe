// src/pages/RequestFormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import "../styles/requestForm.css";
import axios from "axios";

const RequestFormPage = () => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [amountText, setAmountText] = useState(`
    최소 신청량은 10L이며, 10L 이하라도 기본 요금이 적용됩니다.
  `);
  const [amountText2, setAmountText2] = useState(`
    기본 요금: 2,500원, 1L당 초과요금: 200원
  `);

  const [formData, setFormData] = useState({
    trashTypes: 9,
    trashAmount: "10",
    location: "",
    requestDetails: "",
    image: null,
    money: 2500,
  });

  // 쓰레기 종류 옵션
  const trashTypeOptions = [
    { id: 0, label: "월: 플라스틱류" },
    { id: 5, label: "토: 불에 타는 쓰레기·병류" },
    { id: 1, label: "화: 종이류" },
    { id: 6, label: "일: 스티로폼" },
    { id: 2, label: "수: 캔·고철류" },
    { id: 7, label: "일반쓰레기" },
    { id: 3, label: "목: 스티로폼·비닐류" },
    { id: 8, label: "음식물쓰레기" },
    { id: 4, label: "금: 플라스틱류" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTrashTypeToggle = (typeId) => {
    // 하나만 선택되도록 하여 이전 값이 있으면 변경
    setFormData((prev) => ({
      ...prev,
      trashTypes: prev.trashTypes === typeId ? 9 : typeId,
    }));
    if (typeId === 8) {
      setAmountText(`
        음식물쓰레기는 1L 까지 기본 요금이며, 이후 1L당 추당 요금이 발생합니다.
      `);
    } else {
      setAmountText(`
         10L 까지 기본 요금이며, 이후 1L당 추가 요금이 발생합니다.
      `);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const calculateTotalPrice = () => {
    const basePrice = 2500;
    const amountNum = parseInt(formData.trashAmount) || 0;

    // 1L 이하일 경우 기본 요금만 적용
    if (amountNum <= (formData.trashTypes === 8 ? 1 : 10)) {
      return basePrice;
    }

    // 초과분에 대한 요금 계산
    const extraAmount = amountNum - (formData.trashTypes === 8 ? 1 : 10);
    const extraPrice = extraAmount * 200;

    setFormData((prevFormData) => ({
      ...prevFormData,
      money: basePrice + extraPrice, // money 값을 업데이트
    }));
    return basePrice + extraPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const submitRequest = async (e) => {
    // API 호출 대신 로컬 처리
    console.log("요청 데이터:", formData);
    const data = new FormData();
    data.append("trash_type", formData.trashTypes);
    data.append("trash_amount", formData.trashAmount);
    data.append("address", formData.location);
    data.append("request_term", formData.requestDetails);
    data.append("money", formData.money);
    data.append("image", formData.image);

    try {
      // axios로 POST 요청 보내기
      const response = await axios.post("http://3.37.88.60/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 성공적인 응답 처리
      console.log("File uploaded successfully", response);

      // 요청 목록 페이지로 이동
      navigate("/request-list");
    } catch (error) {
      // 에러 처리
      console.error("Error uploading file", error);
    } finally {
    }
  };

  return (
    <div className="form-container">
      <div className="relative">
        <Header title="대행 요청하기" showBack={true} showMenu={false} />
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
                  navigate("/");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="text-gray-700">지도</span>
              </button>
              <button
                onClick={() => {
                  navigate("/guide");
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

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-section">
          <h2 className="section-title">쓰레기 종류</h2>
          <div className="trash-types-grid">
            {trashTypeOptions.map((type) => (
              <div
                key={type.id}
                onClick={() => handleTrashTypeToggle(type.id)}
                className={`trash-type-option ${
                  formData.trashTypes == type.id ? "trash-type-selected" : ""
                }`}
              >
                <label className="trash-type-label">
                  <input
                    type="checkbox"
                    checked={formData.trashTypes == type.id} // 하나만 선택되도록 비교
                    onChange={() => handleTrashTypeToggle(type.id)}
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
          <p className="section-description2">{amountText}</p>
          <p className="section-description">{amountText2}</p>
          <input
            type="number"
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
            type="search"
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
            maxLength={20}
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
          <label htmlFor="image-upload" className="file-upload-button">
            사진 업로드
          </label>
        </div>

        <div className="form-footer">
          <div className="total-price">
            <span className="price-label">총액:</span>
            <span className="price-value">
              {calculateTotalPrice().toLocaleString()}원
            </span>
          </div>

          <button type="submit" className="submit-button">
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

export default RequestFormPage;
