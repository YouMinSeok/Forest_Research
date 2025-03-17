// src/pages/boards/NewsDetail.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BoardCommon.css';

function NewsDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;

  if (!post) {
    return (
      <div className="board-page">
        <h2>뉴스 상세보기</h2>
        <p>게시글 정보를 찾을 수 없습니다. (페이지 새로고침 시 API 또는 전역 상태 연결 필요)</p>
        <button onClick={() => navigate('/board/news')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="board-page">
      <h2>뉴스 상세보기</h2>
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
      <button onClick={() => navigate('/board/news')}>목록으로</button>
    </div>
  );
}

export default NewsDetail;
