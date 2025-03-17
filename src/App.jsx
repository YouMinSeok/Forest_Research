// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainHome from './pages/MainHome';

// 기존 게시판
import NoticeBoard from './pages/boards/NoticeBoard';
import NewsBoard from './pages/boards/NewsBoard';
import ResearchDataBoard from './pages/boards/ResearchDataBoard';
import SubmissionDataBoard from './pages/boards/SubmissionDataBoard';
import ProposalBoard from './pages/boards/ProposalBoard';

// 자유게시판
import FreeBoard from './pages/boards/FreeBoard';
import FreeDetail from './pages/boards/FreeDetail';

// 연구실 메모 공간 (통합된 MemoBoardFigmaLike)
import MemoBoardFigmaLike from './components/MemoBoardFigmaLike';

// 상세 페이지 (예시)
import NoticeDetail from './pages/boards/NoticeDetail';
import NewsDetail from './pages/boards/NewsDetail';
import ResearchDetail from './pages/boards/ResearchDetail';
import SubmissionDetail from './pages/boards/SubmissionDetail';
import ProposalDetail from './pages/boards/ProposalDetail';

// 기타 페이지들
import ResearchProject from './pages/ResearchProject';
import IdeaWarehouse from './pages/IdeaWarehouse';
import MyMenu from './pages/MyMenu';
import NotFound from './pages/NotFound';

// 로그인/회원가입, PDF 등
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AcademicSchedule from './pages/AcademicSchedule';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인/회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Layout 사용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainHome />} />

          {/* 기존 게시판 라우트 */}
          <Route path="board/notice" element={<NoticeBoard />} />
          <Route path="board/news" element={<NewsBoard />} />
          <Route path="research/research-data" element={<ResearchDataBoard />} />
          <Route path="research/submission-data" element={<SubmissionDataBoard />} />
          <Route path="research/proposal" element={<ProposalBoard />} />

          {/* 자유게시판 */}
          <Route path="community/free" element={<FreeBoard />} />
          <Route path="community/free/:postId" element={<FreeDetail />} />

          {/* 연구실 메모 공간 */}
          <Route path="community/memo" element={<MemoBoardFigmaLike />} />

          {/* 상세 페이지 */}
          <Route path="board/notice/:postId" element={<NoticeDetail />} />
          <Route path="board/news/:postId" element={<NewsDetail />} />
          <Route path="research/research-data/:postId" element={<ResearchDetail />} />
          <Route path="research/submission-data/:postId" element={<SubmissionDetail />} />
          <Route path="research/proposal/:postId" element={<ProposalDetail />} />

          {/* 기타 */}
          <Route path="research-project" element={<ResearchProject />} />
          <Route path="idea" element={<IdeaWarehouse />} />
          <Route path="my-menu" element={<MyMenu />} />
          <Route path="academic-schedule" element={<AcademicSchedule />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
