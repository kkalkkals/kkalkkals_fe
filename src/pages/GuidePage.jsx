import React from 'react';
import Header from '../components/common/Header';
import './GuidePage.css';

const GuidePage = () => {
  return (
    <div className="guide-container">
      <Header title="클린하우스란?" showBack={true} showMenu={false} />
      
      <div className="guide-content">
        <div className="info-card">
          <p className="card-title">
            🏝️ 클린하우스란?
          </p>
          <p className="card-text">
            제주도에서 재활용 분리수거와 쓰레기를 버리는 장소예요!<br />
            다른 지역처럼 집 앞에 아무 때나 버리는 게 아니라,<br />
            요일별로 정해진 품목만 클린하우스에 배출할 수 있어요.
          </p>
        </div>
        
        <div className="info-card">
          <h3 className="card-title bold">🗓️ 쓰레기 배출 요일</h3>
          <ul className="schedule-list">
            <li>월요일: 플라스틱</li>
            <li>화요일: 종이, 불연성</li>
            <li>수요일: 플라스틱</li>
            <li>목요일: 종이, 비닐</li>
            <li>금요일: 플라스틱</li>
            <li>토요일: 종이, 불연성</li>
            <li>일요일: 플라스틱, 비닐</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3 className="card-title bold">🗓️ 매일 배출 항목</h3>
          <p className="card-text">
            스티로폼, 병류, 캔/고철류, 흰색종량제 쓰레기 봉투, 음식물 쓰레기
          </p>
        </div>
        
        <div className="info-card">
          <p className="card-text margin-bottom">
            그런데…!<br />
            많이들 쓰는 지도 앱에서 클린하우스 위치가 표시되지 않는다는 사실 알고 계셨나요? 😮
          </p>
          <p className="card-title bold">🔸 깔깔스가 도와드릴게요!</p>
          <ul className="service-list">
            <li>✔️ 제주 전역의 클린하우스 위치 제공 → 지도에서 바로 확인 가능!</li>
            <li>✔️ 쓰레기 버리기 대행 서비스 → 시간이 안 맞거나 어려우면 요청하세요!</li>
          </ul>
          <p className="card-text margin-top">
            깔깔스가 대신 버려드릴게요!<br />
            이제 쓰레기 버릴 걱정 없이 깨끗한 제주 라이프를 즐겨보세요! 😊🏝️
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;