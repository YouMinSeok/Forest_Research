// src/pages/boards/ResearchDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BoardCommon.css';

function ResearchDetail() {
  // useLocation을 사용하여 state에서 게시글 데이터를 가져옵니다.
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post; // state에 게시글 데이터가 있다면 사용

  if (!post) {
    return (
      <div className="board-page">
        <h2>연구자료 상세보기</h2>
        <p>게시글 정보를 찾을 수 없습니다. (페이지 새로고침 시 API 또는 전역 상태 연결 필요)</p>
        <button onClick={() => navigate('/research/research-data')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="board-page">
      <h2>연구자료 상세보기</h2>
      <div style={{ marginBottom: '1rem' }}>
        <strong>{post.title}</strong>
        <div className="post-meta" style={{ fontSize: '0.85rem', color: '#666' }}>
          작성자: {post.writer} | 날짜: {post.date} | 조회: {post.views}
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ marginTop: '1rem' }} />
      {post.tags && post.tags.length > 0 && (
        <p style={{ marginTop: '1rem' }}>태그: {post.tags.join(', ')}</p>
      )}
      <button onClick={() => navigate('/research/research-data')}>목록으로</button>
    </div>
  );
}

export default ResearchDetail;
