import React from "react";

const RequestModal = ({ requests, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 바깥 클릭 시 닫힘
    >
      <div 
        className={`bg-white rounded-2xl shadow-lg w-[350px] ${
          requests.length > 5 ? "max-h-[400px] overflow-y-auto" : "h-auto"
        } flex flex-col`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
      >
        {/* 모달 상단 - 제목 고정 */}
        <div className="p-4 border-b font-bold text-lg text-center bg-[#F0F7FC] rounded-t-2xl">
          쓰레기 배출 요청
        </div>

        {/* 요청 목록 - 스크롤 가능 영역 */}
        <div className="p-4 space-y-3">
          {requests.map((request) => (
            <div key={request.post_id} className="p-3 border-b last:border-none flex justify-between items-center">
              <div className="text-left">
                <p className="text-sm">🗑️ 쓰레기 종류 : {request.trash_type}</p>
                <p className="text-sm">📦 쓰레기 총량 : {request.trash_amount} L</p>
                <p className="text-sm">📍 주소 : {request.address.replace("제주특별자치도 ", "")}</p>
                <p className="text-sm">💰 수고비 : {request.money.toLocaleString()}원</p>
              </div>
              <button 
                className="bg-[#FFF3EE] text-[#FF6B6B] text-xs py-1 px-3 rounded-md whitespace-nowrap hover:bg-[#FFE3D5]"
                onClick={() => window.location.href = `/request/${request.post_id}`}
              >
                상세 보기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;