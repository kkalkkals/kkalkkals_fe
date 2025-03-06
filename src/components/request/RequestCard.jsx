import React from "react";
import "../../styles/requestList.css";
import { useNavigate } from "react-router-dom";

const trashTypeMapping = {
  0: "플라스틱",
  1: "종이류",
  2: "캔·고철류",
  3: "스티로폼·비닐류",
  4: "플라스틱",
  5: "불에 타는 쓰레기·병류",
  6: "스티로폼",
  7: "일반쓰레기",
  8: "음식물쓰레기",
};

const reverseTrashTypeMapping = Object.fromEntries(
  Object.entries(trashTypeMapping).map(([key, value]) => [value, Number(key)])
);

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
        <div className="detail-item">
          <span className="label">쓰레기 종류</span>
          <span className="value">{request.trashType}</span>
        </div>
        <div className="detail-item">
          <span className="label">쓰레기 총량</span>
          <span className="value">{request.trashAmount}</span>
        </div>
        <div className="detail-item">
          <span className="label">수거 위치</span>
          <span className="value">{request.location}</span>
        </div>
        <div className="detail-item">
          <span className="label">금액</span>
          <span className="value">
            {request.money.toLocaleString("ko-KR")}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
