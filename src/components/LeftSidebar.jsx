import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';

function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      {/* 공지사항 */}
      <div className="category-block">
        <h2 className="category-title">공지사항</h2>
        <ul className="sub-list">
          <li><Link to="/board/notice">공지사항</Link></li>
          <li><Link to="/board/news">뉴스</Link></li>
        </ul>
      </div>

      {/* 연구 */}
      <div className="category-block">
        <h2 className="category-title">연구</h2>
        <ul className="sub-list">
          <li><Link to="/research/research-data">연구자료</Link></li>
          <li><Link to="/research/submission-data">제출자료</Link></li>
          <li><Link to="/research/proposal">제안서</Link></li>
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
