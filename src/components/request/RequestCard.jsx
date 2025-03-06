import React from "react";
import "../../styles/requestList.css";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request, onAccept, onComplete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/request/${request.id}`);
  };

  // 상태 배지 클래스명 반환
  const getStatusBadgeClass = (status) => {
    return `status-badge ${status}`;
  };

  return (
    <div className="request-card" onClick={handleCardClick}>
      <div className="request-header">
        <div className="request-date">{request.date}</div>
        <div className={getStatusBadgeClass(request.status)}>
          {request.status}
        </div>
      </div>

      <div className="request-content">
        <div className="detail-item">쓰레기 종류: {request.trashType}</div>
        <div className="detail-item">쓰레기 총량: {request.trashAmount}</div>
        <div className="detail-item">수거 위치: {request.location}</div>
      </div>

      <div className="request-details">
        <div className="detail-item">수거 요청사항</div>
        <div className="detail-item">{request.requestDetails}</div>
      </div>

      {request.image && (
        <img
          src={request.image}
          alt="쓰레기 이미지"
          className="request-image"
        />
      )}

      <div className="action-buttons">
        {request.status === "요청중" && (
          <button
            className="action-button accept-button"
            onClick={(e) => {
              e.stopPropagation();
              onAccept(request.id);
            }}
          >
            수락하기
          </button>
        )}
        {request.status === "수거중" && (
          <button
            className="action-button complete-button"
            onClick={(e) => {
              e.stopPropagation();
              onComplete(request.id);
            }}
          >
            대행완료
          </button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
