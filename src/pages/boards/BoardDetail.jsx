// src/pages/boards/BoardDetail.jsx
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome 아이콘
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardPost } from '../../api/board';
import './BoardDetail.css';

function BoardDetail() {
  const { category, postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBoardPost(postId);
        setPost(data);
      } catch (error) {
        console.error('게시글 로딩 에러:', error);
      }
    };
    loadPost();
  }, [postId]);

  if (!post) {
    return <div className="loading">로딩 중...</div>;
  }

  // 좋아요/댓글/공유/신고 클릭 시 로직 (예: 나중에 백엔드 연동)
  const handleLike = () => {
    console.log('좋아요 클릭');
  };
  const handleCommentIcon = () => {
    console.log('댓글 아이콘 클릭');
  };
  const handleShare = () => {
    console.log('공유 클릭');
  };
  const handleReport = () => {
    console.log('신고 클릭');
  };

  // 댓글 관련
  const handleAttachImage = () => {
    console.log('카메라 아이콘 클릭 -> 파일 업로드');
  };
  const handleSubmitComment = () => {
    console.log('댓글 등록');
  };

  return (
    <div className="board-detail-container">
      {/* 상단 영역: 카테고리, 제목(HTML 파싱), 작성자/날짜 */}
      <div className="post-header">
        <div className="post-category">[{category}]</div>
        <h1
          className="post-title"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
        <div className="post-meta">
          <span className="writer">{post.writer}</span>
          <span className="date">{new Date(post.date).toLocaleString()}</span>
        </div>
      </div>

      {/* 본문 (dangerouslySetInnerHTML로 Quill 서식 유지) */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <hr className="content-divider" />

      {/* 좋아요/댓글/공유/신고 아이콘 */}
      <div className="post-icons">
        <span className="icon-item" onClick={handleLike}>
          <i className="fas fa-heart"></i> 좋아요 {post.likeCount || 0}
        </span>
        <span className="icon-item" onClick={handleCommentIcon}>
          <i className="fas fa-comment"></i> 댓글 {post.commentCount || 0}
        </span>
        <span className="icon-item" onClick={handleShare}>
          <i className="fas fa-share"></i> 공유
        </span>
        <span className="icon-item" onClick={handleReport}>
          <i className="fas fa-exclamation-triangle"></i> 신고
        </span>
      </div>

      {/* 댓글 섹션 */}
      <div className="comments-section">
        <h2>댓글</h2>
        {/* 실제 댓글 목록은 추후 동적 구현 */}
        <div className="comment-list">
          {/* 예시로 아무것도 없음 */}
        </div>

        {/* 댓글 입력창: 카메라 + textarea + 등록 버튼 */}
        <div className="comment-input">
          <i className="fas fa-camera camera-icon" onClick={handleAttachImage}></i>
          <textarea placeholder="댓글을 남겨보세요" />
          <button
            type="button"
            className="comment-submit-link"
            onClick={handleSubmitComment}
          >
            등록
          </button>
        </div>
      </div>

      {/* 하단 버튼들 (목록/답글/TOP) */}
      <div className="bottom-buttons">
        <button className="list-btn">목록</button>
        <button className="reply-btn">답글</button>
        <button className="top-btn">TOP</button>
      </div>
    </div>
  );
}

export default BoardDetail;
