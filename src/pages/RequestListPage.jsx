import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import TabMenu from "../components/tabs/TabMenu";
import Modal from "../components/common/Modal"; // 모달 추가
import RequestCard from "../components/request/RequestCard"; // RequestCard 적용
import "../styles/requestList.css";

const API_URL = "http://3.37.88.60:80/posts/all"; // 백엔드 API 주소

const RequestListPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("최신순");
  const [showCompleted, setShowCompleted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 모달 상태 추가
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("Fetched Data:", data);

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("API 응답이 예상과 다릅니다.");
        }

        const formattedRequests = data.data.map((post) => ({
          id: post.post_id,
          date: new Date(post.date).toISOString().split("T")[0], // 날짜 변환
          status: post.status === 0 ? "요청중" : post.status === 1 ? "수거중" : "완료됨",
          trashType: post.trash_type,
          trashAmount: `${post.trash_amount}L`,
          location: post.address,
          requestDetails: post.request_term || "요청사항 없음",
          image: post.image,
        }));

        setRequests(formattedRequests);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchRequests();
  }, []);

  // 필터링된 요청 목록
  const filteredRequests = () => {
    let filtered = [...requests];

    if (!showCompleted) {
      filtered = filtered.filter(request =>
        request.status !== "완료됨" && request.status !== "취소됨"
      );
    }

    if (filter === "최신순") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return filtered;
  };

  // 요청 수락 모달 열기
  const openAcceptModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsAcceptModalOpen(true);
  };

  // 대행 완료 모달 열기
  const openCompletedModal = (requestId) => {
    setSelectedRequestId(requestId);
    setIsCompletedModalOpen(true);
  };

  // 모달 닫기 함수
  const closeAcceptModal = () => setIsAcceptModalOpen(false);
  const closeCompletedModal = () => setIsCompletedModalOpen(false);

  // 요청 수락 처리
  const handleAcceptConfirm = () => {
    console.log(`요청 ${selectedRequestId} 수락`);
    // TODO: 백엔드 API에 요청 수락 로직 추가
    closeAcceptModal();
  };

  // 대행 완료 처리
  const handleCompleteConfirm = () => {
    console.log(`요청 ${selectedRequestId} 대행 완료`);
    // TODO: 백엔드 API에 대행 완료 요청 추가
    closeCompletedModal();
  };

  return (
    <div className="list-container">
      <div className="relative">
        <Header title="배출 대행" showBack={true} showMenu={false} />
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

      {/* 필터 UI */}
      <div className="filter-bar px-4 mt-4 flex items-center justify-between">
        <button
          onClick={() => setFilter(filter === "최신순" ? "오래된순" : "최신순")}
          className="filter-button px-4 py-2 border rounded-lg text-sm"
        >
          {filter} ⬇
        </button>

        <div className="show-completed-toggle flex items-center">
          <input 
            type="checkbox" 
            id="show-completed" 
            className="toggle-checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          <label htmlFor="show-completed" className="ml-2 text-sm text-gray-600">
            배출 완료된 건 보기
          </label>
        </div>
      </div>

      {/* 요청 목록 */}
      <div className="list-content mt-4">
        {filteredRequests().map(request => (
          <RequestCard
            key={request.id}
            request={request}
            onAccept={openAcceptModal}
            onComplete={openCompletedModal}
          />
        ))}
      </div>

      {/* 수락 확인 모달 */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={closeAcceptModal}
        title="요청을 수락하시겠습니까?"
        children="수락 후, 2번 이상 수거하지 않을 시 이용이 제한됩니다."
        confirmText="수락"
        cancelText="닫기"
        onConfirm={handleAcceptConfirm}
        variant="primary"
      />

      {/* 대행 완료 모달 */}
      <Modal
        isOpen={isCompletedModalOpen}
        onClose={closeCompletedModal}
        title="쓰레기 배출이 완료되었나요?"
        children="환경을 위한 한 걸음! 당신의 한 걸음이 제주를 깨끗하게 만들었어요!"
        confirmText="네"
        cancelText="아니오"
        onConfirm={handleCompleteConfirm}
        variant="primary"
      />

      <TabMenu activeTab="request-list" />
    </div>
  );
};

export default RequestListPage;
