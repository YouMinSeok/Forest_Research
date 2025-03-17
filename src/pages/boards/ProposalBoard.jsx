// src/pages/boards/ProposalBoard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CafeWritePost from '../../components/CafeWritePost';
import './BoardCommon.css';

function ProposalBoard() {
  const [posts, setPosts] = useState([]); // 초기 데이터: 빈 배열
  const [showWrite, setShowWrite] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => alert('검색 기능(추후 구현)');
  const handleWriteButton = () => setShowWrite(true);
  const handleWriteSubmit = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowWrite(false);
  };

  // 게시글 클릭 시, 상세 페이지로 이동 (예: /research/proposal/:postId)
  const handlePostClick = (post) => {
    navigate(`/research/proposal/${post.id}`, { state: { post } });
  };

  return (
    <div className="board-page">
      <h2>제안서 게시판</h2>

      {!showWrite && (
        <>
          <div className="board-top-bar">
            <div className="board-info">
              총 게시물 <strong>{posts.length}</strong>건 / 페이지 <strong>1</strong>/<strong>?</strong>
            </div>
            <div className="board-search-area">
              <select className="board-filter">
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
                <option value="content">내용</option>
              </select>
              <input type="text" className="board-search-input" placeholder="검색어 입력" />
              <button className="board-search-btn" onClick={handleSearch}>검색</button>
              <button className="write-btn" onClick={handleWriteButton}>글 작성</button>
            </div>
          </div>

          <table className="board-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '100px' }}>작성자</th>
                <th style={{ width: '120px' }}>날짜</th>
                <th style={{ width: '60px' }}>조회</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr
                  key={post.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handlePostClick(post)}
                >
                  <td>{idx + 1}</td>
                  <td className="post-title">{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{post.date}</td>
                  <td>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {showWrite && (
        <CafeWritePost boardList={['제안서']} onSubmit={handleWriteSubmit} />
      )}
    </div>
  );
}

export default ProposalBoard;
