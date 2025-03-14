// src/components/TopNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

// 1) logo.png import
import logoImg from '../assets/logo.png';

function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav-inner">
        <div className="topnav-left">
          <Link to="/" className="site-logo">
            {/* 2) src={logoImg} 로 대체 */}
            <img
              src={logoImg}
              alt="연구의숲 로고"
              className="logo-img"
            />
          </Link>
        </div>

        <nav className="topnav-menu">
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/research-project">연구프로젝트</Link></li>
            <li><Link to="/idea">아이디어 창고</Link></li>
            <li><Link to="/my-menu">마이메뉴</Link></li>
          </ul>
        </nav>

        <div className="topnav-auth">
          <Link to="/login">로그인</Link>
          <span className="divider">|</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
