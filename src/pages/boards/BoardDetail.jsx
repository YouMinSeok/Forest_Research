// src/pages/boards/BoardDetail.jsx
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome 아이콘
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoardPost } from '../../api/board';
import CommentSection from '../../components/CommentSection'; // 댓글 컴포넌트 추가
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

  // HTML 태그 제거 함수: 제목에 Quill 서식이 있더라도 순수 텍스트만 반환
  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // 제목은 순수 텍스트로 표시하여 통일된 스타일 유지
  const plainTitle = stripHtmlTags(post.title);

  // 좋아요/댓글/공유/신고 클릭 시 로직 (추후 백엔드 연동)
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

  return (
    <div className="board-detail-container">
      {/* 상단 영역: 카테고리, 제목(plain text), 작성자/날짜 */}
      <div className="post-header">
        <div className="post-category">[{category}]</div>
        <h1 className="post-title">{plainTitle}</h1>
        <div className="post-meta">
          <span className="writer">{post.writer}</span>
          <span className="date">{new Date(post.date).toLocaleString()}</span>
        </div>
      </div>

      {/* 본문 (Quill 서식 유지) */}
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

      {/* 댓글 섹션: 분리된 CommentSection 컴포넌트 사용 */}
      <CommentSection postId={post.id} />

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
