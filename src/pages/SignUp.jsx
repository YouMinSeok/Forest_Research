// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css'; // 회원가입 전용 CSS

function SignUp() {
  // step: 0 → 학생/교수 선택, 1 → 회원가입 폼
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setStep(1);
  };

  const handleBack = () => {
    setRole('');
    setStep(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 회원가입 처리 로직 구현
    alert(`${role} 회원가입 처리`);
  };

  return (
    <div className="signup-outer">
      <div className="signup-container">
        {/* 0단계: 학생/교수 선택 */}
        {step === 0 && (
          <div className="signup-form">
            <h2 className="signup-title">회원가입</h2>
            <p className="signup-description">회원 유형을 선택해주세요.</p>
            <div className="signup-role-selection">
              <button className="signup-btn-role" onClick={() => handleRoleSelection('student')}>
                학생
              </button>
              <button className="signup-btn-role" onClick={() => handleRoleSelection('professor')}>
                교수
              </button>
            </div>
            <div className="signup-extra">
              <span>이미 계정이 있으신가요?</span>
              <Link to="/login" className="signup-link"> 로그인</Link>
            </div>
          </div>
        )}

        {/* 1단계: 실제 회원가입 폼 */}
        {step === 1 && (
          <div className="signup-form">
            <h2 className="signup-title">
              {role === 'student' ? '학생 회원가입' : '교수 회원가입'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="signup-form-group">
                <label>아이디</label>
                <input type="text" placeholder="아이디" required />
              </div>
              <div className="signup-form-group">
                <label>비밀번호</label>
                <input type="password" placeholder="비밀번호" required />
              </div>
              <div className="signup-form-group">
                <label>이메일</label>
                <input type="email" placeholder="이메일" required />
              </div>

              {/* 학생 전용 필드 */}
              {role === 'student' && (
                <div className="signup-form-group">
                  <label>연구 코드</label>
                  <input type="text" placeholder="연구 코드" />
                </div>
              )}

              {/* 교수 전용 필드 */}
              {role === 'professor' && (
                <div className="signup-form-group">
                  <label>권한 부여</label>
                  <input type="text" placeholder="권한 코드" />
                </div>
              )}

              <button type="submit" className="signup-btn signup-btn-fullwidth">
                회원가입
              </button>
            </form>

            <button className="signup-btn-back" onClick={handleBack}>
              ← 뒤로
            </button>

            <div className="signup-extra">
              <span>이미 계정이 있으신가요?</span>
              <Link to="/login" className="signup-link"> 로그인</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUp;
