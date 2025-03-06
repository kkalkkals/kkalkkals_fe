import React from "react";
import "../../styles/requestCard.css";

const RequestCard = ({ request, onAccept, onComplete }) => {
  // 상태 배지 스타일 클래스명 반환
    const getStatusBadgeClass = (status) => {
        switch (status) {
        case "요청중":
            return "status-badge status-pending";
        case "수거중":
            return "status-badge status-collecting";
        case "완료됨":
            return "status-badge status-completed";
        default:
            return "status-badge status-default";
        }
    };

    return (
        <div className="request-card">
        <div className="request-header">
            <div className="date-badge">{request.date}</div>
            <span className={getStatusBadgeClass(request.status)}>
            {request.status}
            </span>
        </div>
        <div className="cardBox">
            <div className="request-details">
                <p className="detail-item">쓰레기 종류: {request.trashType}</p>
                <p className="detail-item">쓰레기 총량(L): {request.trashAmount}</p>
                <p className="detail-item">수거 위치: {request.location}</p>
                <p className="detail-item">수거 요청사항
            <br />
                {request.requestDetails}</p>
            </div>
            <div className="request-footer">
                <div className="request-image">
                {request.image ? (
                    <img src={request.image} alt="쓰레기 이미지" />
                ) : (
                    <div></div>
                )}
                </div>

                <div className="action-buttons">
                {request.status === "요청중" && (
                    <button onClick={() => onAccept(request.id)} className="accept-button">
                    수락하기
                    </button>
                )}

                {request.status === "수거중" && (
                    <button onClick={() => onComplete(request.id)} className="complete-button">
                    대행완료
                    </button>
                )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default RequestCard;
