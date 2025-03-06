import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import '../styles/requestDetail.css';

const RequestDetailPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // API에서 요청 상세 정보를 가져오는 로직
    const fetchRequestDetail = async () => {
      try {
        const response = await fetch(`http://3.37.88.60:80/posts/${id}`);
        const data = await response.json();
        setRequest(data.data);
      } catch (error) {
        console.error('Error fetching request details:', error);
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

  return (
    <div className="detail-container">
      <Header title="대행 요청하기" showBack={true} />
      
      <div className="detail-content">
        {/* 쓰레기 종류 섹션 */}
        <h2 className="section-title">쓰레기 종류</h2>
        <div className="trash-type-grid">
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('왕: 플라스틱류')}
              readOnly
            />
            <span className="trash-type-label">왕: 플라스틱류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('토: 물에 안타는')}
              readOnly
            />
            <span className="trash-type-label">토: 물에 안타는<br />쓰레기/병류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('화: 종이류')}
              readOnly
            />
            <span className="trash-type-label">화: 종이류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('수: 캔/고철류')}
              readOnly
            />
            <span className="trash-type-label">수: 캔/고철류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('목: 스티로폼/비닐류')}
              readOnly
            />
            <span className="trash-type-label">목: 스티로폼/비닐류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('금: 플라스틱류')}
              readOnly
            />
            <span className="trash-type-label">금: 플라스틱류</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('일반쓰레기')}
              readOnly
            />
            <span className="trash-type-label">일반쓰레기</span>
          </div>
          <div className="trash-type-item">
            <input
              type="checkbox"
              className="trash-type-checkbox"
              checked={request.trash_type?.includes('음식물쓰레기')}
              readOnly
            />
            <span className="trash-type-label">음식물쓰레기</span>
          </div>
        </div>

        {/* 쓰레기 양 섹션 */}
        <h2 className="section-title">쓰레기 종량(L)</h2>
        <p className="amount-info">
          10L 까지 기본 요금이며, 이후 1L 당 추가 요금이 발생합니다.<br />
          기본 요금: 2,500원, 1L당 추가 요금: 200원
        </p>
        <input
          type="text"
          className="amount-input"
          placeholder="숫자만 입력해주세요"
          value={request.trash_amount}
          readOnly
        />

        {/* 수거 요청 주소 섹션 */}
        <h2 className="section-title">수거 요청 주소</h2>
        <input
          type="text"
          className="location-input"
          placeholder="도로명 주소로 입력해주세요"
          value={request.address}
          readOnly
        />

        {/* 수거자에게 전할 말 섹션 */}
        <h2 className="section-title">수거자에게 전할 말</h2>
        <textarea
          className="message-input"
          placeholder="주의사항을 적어주세요"
          value={request.request_term}
          readOnly
          maxLength={20}
          onChange={(e) => setCharCount(e.target.value.length)}
        />
        <div className="character-count">{charCount}/20</div>

        {/* 사진 첨부 섹션 */}
        <h2 className="section-title">쓰레기 사진 첨부</h2>
        <h3 className="section-subtitle">사진 첨부</h3>
        <div className="image-preview">
          {request.image ? (
            <img
              src={`http://3.37.88.60/${request.image}`}
              alt="쓰레기 사진"
              className="preview-image"
            />
          ) : (
            <div className="image-placeholder">
              사진 첨부
            </div>
          )}
        </div>

        {/* 총 금액 */}
        <div className="total-price">
          총액: {request.price || 5000}원
        </div>

        {/* 요청하기 버튼 */}
        <button className="submit-button">
          요청하기
        </button>
      </div>
    </div>
  );
};

export default RequestDetailPage;