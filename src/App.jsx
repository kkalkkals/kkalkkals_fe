// import './App.css';

// function App() {
//   return <div className="font-bold">깔깔쓰</div>;
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RequestListPage from './pages/RequestListPage';
import RequestFormPage from './pages/RequestFormPage';
import RequestDetailPage from './pages/RequestDetailPage';
import LoginPage from './pages/LoginPage';
import GuidePage from './pages/GuidePage';
import Menu from './components/common/Menu';

const App = () => {
  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/request-list" element={<RequestListPage />} />
          <Route path="/request-form" element={<RequestFormPage />} />
          <Route path="/request/:id" element={<RequestDetailPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/menu" element={<Menu isOpen={true} onClose={() => window.history.back()} />} />
        </Routes>
      </div>
    </Router>
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
