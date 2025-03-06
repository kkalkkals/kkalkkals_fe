#깔깔쓰 프론트엔드
/kkalkkals_fe
  ├── public/                # 정적 파일 (favicon, 로고 등)
  ├── src/                   # 소스 코드
  │   ├── assets/            # 이미지, 아이콘, 스타일 등 정적 파일
  │   │   ├── images/        # 이미지 파일
  │   │   ├── icons/         # 아이콘 파일
  │   │   ├── styles/        # 전역 스타일(css, tailwind, styled-components 등)
  │   ├── components/        # 재사용 가능한 컴포넌트
  │   │   ├── common/        # 공통 컴포넌트 (버튼, 로딩, 카드 등)
  │   │   ├── layout/        # 레이아웃 관련 (헤더, 푸터, 사이드바 등)
  │   │   ├── ui/            # 개별적인 UI 요소 (모달, 햄버거 메뉴 등)
  │   │   ├── Header.jsx     # 헤더 컴포넌트
  │   │   ├── HamburgerMenu.jsx  # 햄버거 메뉴 컴포넌트
  │   │   ├── Modal.jsx      # 모달 컴포넌트
  │   ├── pages/             # 개별 페이지 컴포넌트
  │   │   ├── Home.jsx       # 메인 지도 페이지
  │   │   ├── Requests.jsx   # 요청 목록 페이지
  │   │   ├── RequestForm.jsx  # 요청서 작성 페이지
  │   │   ├── NotFound.jsx   # 404 페이지
  │   ├── routes/            # 라우팅 관리
  │   │   ├── AppRouter.jsx  # 전체 라우터 관리
  │   ├── context/           # 상태 관리(Context API)
  │   ├── hooks/             # 커스텀 훅
  │   ├── services/          # API 통신 관련 함수
  │   ├── utils/             # 유틸리티 함수
  │   ├── App.jsx            # 메인 App 컴포넌트
  │   ├── main.jsx           # 엔트리 포인트
  ├── .env                   # 환경 변수 설정
  ├── .gitignore             # Git 제외 파일
  ├── package.json           # 프로젝트 패키지 정보
  ├── README.md              # 프로젝트 설명
