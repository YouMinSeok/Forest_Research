// src/pages/boards/FreeBoard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardCommon from './BoardCommon'; // 공통 컴포넌트
import { fetchBoardPosts, createBoardPost } from '../../api/board';
import './BoardCommon.css';

function FreeBoard() {
  const [posts, setPosts] = useState([]);
  const [showWrite, setShowWrite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 검색 관련 state (필요 시 사용)
  const [searchFilter, setSearchFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const userData =
      sessionStorage.getItem('user') || localStorage.getItem('user');
    setIsLoggedIn(!!userData);
  }, []);

  // 게시글 목록 로딩
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBoardPosts('자유게시판');
        setPosts(data);
      } catch (error) {
        console.error('게시글 로딩 에러:', error);
      }
    };
    loadPosts();
  }, []);

  // 검색 버튼 클릭
  const handleSearch = () => {
    alert('검색 기능(추후 구현)');
  };

  // 글 작성 버튼 클릭
  const handleWriteButton = () => {
    if (!isLoggedIn) {
      alert('글 작성을 위해서는 로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    setShowWrite(true);
  };

  // 글 작성 폼 제출
  const handleWriteSubmit = async (newPost) => {
    try {
      const response = await createBoardPost('자유게시판', newPost);
      setPosts([response, ...posts]);
      setShowWrite(false);
    } catch (error) {
      console.error('글 작성 실패:', error);
    }
  };

  // 게시글 클릭 -> 상세 페이지 이동
  const handlePostClick = (post) => {
    navigate(`/community/자유게시판/${post.id}`, { state: { post } });
  };

  return (
    <BoardCommon
      boardName="자유게시판"
      posts={posts}
      showWrite={showWrite}
      isLoggedIn={isLoggedIn}
      searchFilter={searchFilter}
      setSearchFilter={setSearchFilter}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
      handleWriteButton={handleWriteButton}
      handlePostClick={handlePostClick}
      handleWriteSubmit={handleWriteSubmit}
      hasFileColumn={false}  // 자유게시판: 파일 열 없음
    />
  );
}

export default FreeBoard;
