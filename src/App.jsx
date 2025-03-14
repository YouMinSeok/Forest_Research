// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// 메인 페이지들
import MainHome from './pages/MainHome';
import BoardPage from './pages/BoardPage';
import ResearchProject from './pages/ResearchProject';
import IdeaWarehouse from './pages/IdeaWarehouse';
import MyMenu from './pages/MyMenu';
import ResearchData from './pages/ResearchData';
import SubmissionData from './pages/SubmissionData';
import Proposal from './pages/Proposal';
import NotFound from './pages/NotFound';

// 로그인/회원가입
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* (1) 로그인/회원가입: Layout 없이 별도 라우트 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* (2) 나머지는 Layout 사용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainHome />} />
          <Route path="board/:boardId" element={<BoardPage />} />
          <Route path="research-project" element={<ResearchProject />} />
          <Route path="idea" element={<IdeaWarehouse />} />
          <Route path="my-menu" element={<MyMenu />} />
          <Route path="research/research-data" element={<ResearchData />} />
          <Route path="research/submission-data" element={<SubmissionData />} />
          <Route path="research/proposal" element={<Proposal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
