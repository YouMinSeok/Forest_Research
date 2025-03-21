// src/pages/boards/FreeBoard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CafeWritePost from '../../components/CafeWritePost';
import { fetchBoardPosts, createBoardPost } from '../../api/board';
import './BoardCommon.css';

function FreeBoard() {
  const [posts, setPosts] = useState([]);
  const [showWrite, setShowWrite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 로그인 상태 확인 (sessionStorage 또는 localStorage에 "user" 정보가 있다면)
  useEffect(() => {
    const userData = sessionStorage.getItem("user") || localStorage.getItem("user");
    setIsLoggedIn(!!userData);
  }, []);

  // 게시글 목록 로딩
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBoardPosts("자유게시판");
        setPosts(data);
      } catch (error) {
        console.error("게시글 로딩 에러:", error);
      }
    };
    loadPosts();
  }, []);

  const handleSearch = () => {
    alert("검색 기능(추후 구현)");
  };

  // 글 작성 버튼 클릭 시 로그인 여부 체크
  const handleWriteButton = () => {
    if (!isLoggedIn) {
      alert("글 작성을 위해서는 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    setShowWrite(true);
  };

  // 글 작성 폼 제출
  const handleWriteSubmit = async (newPost) => {
    try {
      const response = await createBoardPost("자유게시판", newPost);
      setPosts([response, ...posts]);
      setShowWrite(false);
    } catch (error) {
      console.error("글 작성 실패:", error);
    }
  };

  // 게시글 클릭 시, 상세 페이지로 이동 (URL에 '자유게시판'과 post.id 포함)
  const handlePostClick = (post) => {
    navigate(`/community/자유게시판/${post.id}`, { state: { post } });
  };

  return (
    <div className="board-page">
      <h2>자유게시판</h2>
      {!showWrite && (
        <>
          <div className="board-top-bar">
            <div className="board-info">
              총 게시물 <strong>{posts.length}</strong>건
            </div>
            <div className="board-search-area">
              <select
                className="board-filter"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
                <option value="content">내용</option>
              </select>
              <input
                type="text"
                className="board-search-input"
                placeholder="검색어 입력"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="board-search-btn" onClick={handleSearch}>
                검색
              </button>
              {isLoggedIn && (
                <button className="write-btn" onClick={handleWriteButton}>
                  글 작성
                </button>
              )}
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
                <tr key={post.id} style={{ cursor: 'pointer' }} onClick={() => handlePostClick(post)}>
                  <td>{idx + 1}</td>
                  <td className="post-title">{post.title}</td>
                  <td>{post.writer}</td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {showWrite && (
        <CafeWritePost boardList={['자유게시판']} onSubmit={handleWriteSubmit} />
      )}
    </div>
  );
}

export default FreeBoard;
