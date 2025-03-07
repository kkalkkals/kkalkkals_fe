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
  // const [btnColor, setBtnColor] = useState("#8c8c8c");
  const [amountText, setAmountText] = useState(`
    최소 신청량은 10L이며, 10L 이하라도 기본 요금이 적용됩니다.
  `);
  const [amountText2, setAmountText2] = useState(`
    기본 요금: 2,500원, 1L당 초과요금: 200원
  `);
  const [charCount, setCharCount] = useState(0);
  const [formData, setFormData] = useState({
    trash_type: 9,
    trash_amount: 10,
    address: "",
    request_term: "",
    image: null,
    money: 2500,
  });

  const isFormValid = () => {
    return (
      formData.trash_type !== 9 &&
      formData.trash_amount !== null &&
      formData.address.trim() !== "" &&
      formData.image !== null
    );
  };

  const handleTrashTypeToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      trash_type: prev.trash_type === type ? 9 : type,
    }));
    if (type === 8) {
      formData.trash_amount = 1;
      setAmountText(`
        음식물쓰레기는 1L 까지 기본 요금이며, 이후 1L당 추당 요금이 발생합니다.
      `);
    } else {
      formData.trash_amount = 10;
      setAmountText(`
         10L 까지 기본 요금이며, 이후 1L당 추가 요금이 발생합니다.
      `);
    }
  };

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
    if (name === "request_term") {
      setCharCount(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const submitRequest = async (e) => {
    // e.preventDefault();
    const data = new FormData();
    data.append("trash_type", formData.trash_type);
    data.append("trash_amount", formData.trash_amount);
    data.append("address", formData.address);
    data.append("request_term", formData.request_term);
    data.append("money", formData.money);
    data.append("image", formData.image);

    try {
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
      console.error("Error creating request:", error);
      alert("올바른 주소를 입력해주세요.");
    }
  };

  return (
    <div className="form-container">
      <Header title="대행 요청하기" showBack={true} />

      <div className="form-content">
        <div className="form-section">
          <h2 className="section-title-add">쓰레기 종류</h2>
          <div className="trash-types-grid">
            {trashTypeOptions.map((type) => (
              <div
                key={type.id}
                className={`trash-type-option ${
                  formData.trash_type === type.id ? "trash-type-selected" : ""
                }`}
              >
                <label className="trash-type-label">
                  <input
                    type="checkbox"
                    checked={formData.trash_type === type.id} // 하나만 선택되도록 비교
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
          <p className="section-title-add">쓰레기 종량(L)</p>
          <p className="section-description2">{amountText}</p>
          <p className="section-description">{amountText2}</p>
          <input
            type="number"
            className="form-input"
            name="trash_amount"
            placeholder="숫자만 입력해주세요"
            value={formData.trash_amount}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h2 className="section-title-add">수거 요청 주소</h2>
          <input
            type="search-form"
            className="form-input"
            name="address"
            placeholder="도로명 주소로 입력해주세요"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-section">
          <h2 className="section-title-add">수거자에게 전할 말</h2>
          <textarea
            className="form-textarea"
            name="request_term"
            placeholder="주의사항을 적어주세요"
            value={formData.request_term}
            maxLength={20}
            onChange={handleInputChange}
          />
          <div className="character-count-add">{charCount}/20</div>
        </div>

        <div className="form-section">
          <h2 className="section-title-add">쓰레기 사진 첨부</h2>
          <input
            type="file"
            id="image-upload"
            className="file-input-hidden"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
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
            <span className="price-value">
              {calculatePrice(formData.trash_amount)}원
            </span>
          </div>
          <button
            className="submit-button"
            style={{ backgroundColor: isFormValid() ? "#92b9d8" : "#8c8c8c" }}
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
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
  const basePrice = 2500;
  const amountNum = parseInt(amount) || 0;

  // 1L 이하일 경우 기본 요금만 적용
  if (amountNum <= (amount === 8 ? 1 : 10)) {
    return basePrice;
  }

  // 초과분에 대한 요금 계산
  const extraAmount = amountNum - (amount === 8 ? 1 : 10);
  const extraPrice = extraAmount * 200;

  amount = basePrice + extraPrice;
  return basePrice + extraPrice;
};

export default RequestFormPage;
