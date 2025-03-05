// import './App.css';

// function App() {
//   return <div className="font-bold">깔깔쓰</div>;
// }

// export default App;

import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainPage from './pages/MainPage';
// import RequestListPage from './pages/RequestListPage';
// import RequestFormPage from './pages/RequestFormPage';
// import RequestDetailPage from './pages/RequestDetailPage';

import { Map } from 'react-kakao-maps-sdk';

const App = () => {
  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
      style={{ width: '800px', height: '600px' }} // 지도 크기
      level={3} // 지도 확대 레벨
    ></Map>
  );
};

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/request-list" element={<RequestListPage />} />
//         <Route path="/request-form" element={<RequestFormPage />} />
//         <Route path="/request/:id" element={<RequestDetailPage />} />
//       </Routes>
//     </Router>
//   );
// };

export default App;
