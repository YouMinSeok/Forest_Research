// src/pages/Login.jsx
import React from 'react';
import './Login.css';  // 로그인 전용 CSS
import logoImg from '../assets/logo.png';

function Login() {
  return (
    <div className="login-page-container">
      <div className="login-box">
        {/* 왼쪽 영역: 로고 + 명언 */}
        <div className="login-box-left">
          <img src={logoImg} alt="연구의숲 로고" className="login-box-logo" />
          <p className="login-box-subtext">
            “사소한 생각들이 모여<br/>
            무성한 연구의 숲을 만든다”
          </p>
        </div>

        {/* 오른쪽 영역: 로그인 폼 */}
        <div className="login-box-right">
          <h2 className="login-title">로그인</h2>
          <form className="login-form">
            <div className="login-field">
              <label>아이디</label>
              <input type="text" placeholder="아이디" />
            </div>
            <div className="login-field">
              <label>비밀번호</label>
              <input type="password" placeholder="비밀번호" />
            </div>
            <button type="submit" className="login-btn">로그인</button>
          </form>

          {/* 하단 링크 */}
          <div className="login-links">
            <div className="login-find">
              <a href="/find-id">아이디 찾기</a> | <a href="/find-password">비밀번호 찾기</a>
            </div>
            <div className="login-extra">
              <span>아직 계정이 없으신가요?</span>
              <a href="/signup" className="signup-link"> 회원가입</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
