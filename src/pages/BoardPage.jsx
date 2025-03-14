// BoardPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './BoardPage.css';

function BoardPage() {
  const { boardId } = useParams();

  // 예시 더미
  const dummyPosts = [
    { id: 1, title: '[공지] 예시글1', author: '관리자', date: '2025-04-01', views: 100 },
    { id: 2, title: '[공지] 예시글2', author: '관리자', date: '2025-03-30', views: 80 },
    { id: 3, title: '[공지] 예시글3', author: '관리자', date: '2025-03-28', views: 45 },
  ];

  const boardTitle = boardId === 'notice' ? '공지사항' : boardId === 'news' ? '뉴스' : '게시판';

  return (
    <div className="board-page">
      <h2>{boardTitle}</h2>
      <div className="board-top">
        <p>{boardTitle}를 안내합니다.</p>
        <button className="write-btn" onClick={() => alert('글 작성 기능 추후 구현')}>
          글 작성
        </button>
      </div>

      <table className="board-table">
        <colgroup>
          <col style={{ width: '60px' }} />
          <col />
          <col style={{ width: '100px' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '60px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {dummyPosts.map((post, idx) => (
            <tr key={post.id}>
              <td>{idx + 1}</td>
              <td className="post-title">{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardPage;
