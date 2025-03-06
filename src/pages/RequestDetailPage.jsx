import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import "../styles/requestDetail.css";

const RequestDetailPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState();

  useEffect(() => {
    // API에서 요청 상세 정보를 가져오는 로직
    const fetchRequestDetail = async () => {
      try {
        const response = await fetch(`http://localhost:80/posts/${id}`);
        const data = await response.json();
        setRequest(data.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (!request) {
    return (
      <div className="detail-container">
        <Header title="대행 요청하기" showBack={true} />
        <div className="detail-content">
          <div>로딩중...</div>
        </div>
      </div>
    );
  }

  const trashTypeOptions = [
    { id: 0, label: "플라스틱류" },
    { id: 1, label: "종이류" },
    { id: 2, label: "캔·고철류" },
    { id: 3, label: "스티로폼·비닐류" },
    { id: 4, label: "플라스틱류" },
    { id: 5, label: "불에 타는 쓰레기·병류" },
    { id: 6, label: "스티로폼" },
    { id: 7, label: "일반쓰레기" },
    { id: 8, label: "음식물쓰레기" },
  ];

  const dateFormat = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const getStatusLabel = (status) => {
    if (status === 0) {
      return "요청중";
    } else if (status === 1) {
      return "수거중";
    }
    return "완료됨";
  };

  const getTypeLabel = (status) => {
    const option = trashTypeOptions.find((option) => option.id === status);
    return option ? option.label : "알 수 없음"; // 값이 없을 경우 기본값 설정
  };

  const getStatusBadgeClass = (status) => {
    return `status-badge ${status}`;
  };

  return (
    <div className="detail-container">
      <Header title="상세 대행" showBack={true} />
      <div className="request-card">
        <div className="request-header">
          <div className="request-date">{dateFormat(request.date)}</div>
          <div className={getStatusBadgeClass(getStatusLabel(request.status))}>
            {getStatusLabel(request.status)}
          </div>
        </div>
        {request.image && (
          <img
            src={"http://3.37.88.60/" + request.image}
            alt="쓰레기 이미지"
            className="request-image"
          />
        )}

        <div className="request-content">
          <div className="detail-item">
            <span className="label">쓰레기 종류</span>
            <span className="value">{getTypeLabel(request.trash_type)}</span>
          </div>
          <div className="detail-item">
            <span className="label">쓰레기 총량</span>
            <span className="value">{request.trash_amount}L</span>
          </div>
          <div className="detail-item">
            <span className="label">수거 위치</span>
            <span className="value">{request.address}</span>
          </div>
          <div className="detail-item">
            <span className="label">금액</span>
            <span className="value">
              {request.money.toLocaleString("ko-KR")}원
            </span>
          </div>
          {request.request_term && (
            <>
              <div className="detail-item">
                <span className="label">수거 요청사항</span>
              </div>
              <div className="request-details">
                <div className="label">{request.request_term}</div>
              </div>
            </>
          )}
        </div>

        <div className="action-buttons">
          {request.status === 0 && (
            <button
              className="action-button accept-button"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              수락하기
            </button>
          )}
          {request.status === 1 && (
            <button
              className="action-button complete-button"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              대행완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
