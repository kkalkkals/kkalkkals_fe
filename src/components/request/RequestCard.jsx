import React from "react";
import "../../styles/requestList.css";

const RequestCard = ({ request, onAccept, onComplete }) => {
  // 상태 배지 클래스명 반환
  const getStatusBadgeClass = (status) => {
    return `status-badge ${status}`;
  };

  return (
    <div 
      className="request-card"
    >
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
          <span className="value">{request.money.toLocaleString("ko-KR")}원</span>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
