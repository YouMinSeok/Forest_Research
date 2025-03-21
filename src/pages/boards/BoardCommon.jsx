// src/pages/boards/BoardCommon.jsx
import React from 'react';
import './BoardCommon.css';          // 공통 CSS
import CafeWritePost from '../../components/CafeWritePost';

/**
 * 공통 게시판 UI 컴포넌트
 *
 * @param {string}   boardName           - 게시판 이름 (ex: "자유게시판", "뉴스")
 * @param {Array}    posts               - 게시물 목록
 * @param {boolean}  showWrite           - 글 작성 폼 표시 여부
 * @param {boolean}  isLoggedIn          - 로그인 여부
 * @param {string}   searchFilter        - 검색 필터 (ex: "all", "title", "writer", ...)
 * @param {string}   searchQuery         - 검색어
 * @param {Function} setSearchFilter     - 검색 필터 변경 함수
 * @param {Function} setSearchQuery      - 검색어 변경 함수
 * @param {Function} handleSearch        - 검색 버튼 클릭 핸들러
 * @param {Function} handleWriteButton   - 글 작성 버튼 클릭 핸들러
 * @param {Function} handlePostClick     - 게시글 클릭 시 상세 페이지 이동
 * @param {Function} handleWriteSubmit   - 글 작성 폼 제출 핸들러
 * @param {boolean}  hasFileColumn       - 파일 열 표시 여부 (뉴스/공지사항 등에서만 사용)
 */
function BoardCommon({
  boardName,
  posts,
  showWrite,
  isLoggedIn,
  searchFilter,
  searchQuery,
  setSearchFilter,
  setSearchQuery,
  handleSearch,
  handleWriteButton,
  handlePostClick,
  handleWriteSubmit,
  hasFileColumn,
}) {
  return (
    <div className="board-page">
      {/* 상단 제목 */}
      <h2>{boardName} 게시판</h2>

      {/* 글 작성 폼이 아니면(목록 모드) => 상단 바 + 테이블 */}
      {!showWrite && (
        <>
          {/* 상단 바: 게시물 수, 검색, 글 작성 */}
          <div className="board-top-bar">
            <div className="board-info">
              총 게시물 <strong>{posts.length}</strong>건
            </div>
            <div className="board-search-area">
              {/* 검색 필터 */}
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

              {/* 검색어 입력 */}
              <input
                type="text"
                className="board-search-input"
                placeholder="검색어 입력"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* 검색 버튼 */}
              <button className="board-search-btn" onClick={handleSearch}>
                검색
              </button>

              {/* 글 작성 버튼 (로그인 상태일 때만) */}
              {isLoggedIn && (
                <button className="write-btn" onClick={handleWriteButton}>
                  글 작성
                </button>
              )}
            </div>
          </div>

          {/* 게시판 테이블 */}
          <table className="board-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '100px' }}>작성자</th>
                <th style={{ width: '120px' }}>날짜</th>
                <th style={{ width: '60px' }}>조회</th>
                {hasFileColumn && (
                  <th style={{ width: '60px' }}>파일</th>
                )}
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
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>{post.views}</td>
                  {hasFileColumn && <td>-</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* 글 작성 폼 (showWrite === true일 때) */}
      {showWrite && (
        <CafeWritePost boardList={[boardName]} onSubmit={handleWriteSubmit} />
      )}
    </div>
  );
}

export default BoardCommon;
