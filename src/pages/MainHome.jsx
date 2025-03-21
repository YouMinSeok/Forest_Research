import React, { useState, useMemo } from 'react';
import './MainHome.css';

/**
 * 메인 홈 페이지 예시
 *
 * 섹션:
 * 1) 뉴스
 *    - 메인 뉴스 (큰 제목, 간략 내용, 날짜/출처)
 *    - 그 외 뉴스 (2컬럼, 제목/날짜)
 *
 * 2) 공지사항
 *
 * 3) 연구 섹션
 *    - 탭 (전체, 연구자료, 제출자료, 제안서) + 2컬럼 게시판
 *    - 연구 게시글 데이터는 state로 관리되어 동기화됨.
 */

function MainHome() {
  // ---------- (1) 뉴스 섹션 ----------
  const mainNews = {
    id: 999,
    title: '글로컬대학, 지역-대학 간 상생과 동반성장의 실질적...',
    content:
      '현 정부의 대표적인 지역대학 육성 정책인 "글로컬대학30"의 성공적인 시행...',
    author: '대학저널In&Out',
    date: '2025.03.08',
  };

  const otherNewsList = [
    { id: 101, title: '파이카의 생태 서식지 변화', author: '환경저널', date: '2025.03.07' },
    { id: 102, title: '대학 AI 논문 2배 성장', author: '뉴스N', date: '2025.03.06' },
    { id: 103, title: '실험실 안전 관리 강화', author: 'LabInside', date: '2025.03.05' },
    { id: 104, title: '교육부 협동 제출 자료 공고', author: '교수신문', date: '2025.03.04' },
    { id: 105, title: '연구비 증액 요구 현황', author: '대학원Life', date: '2025.03.03' },
    { id: 106, title: '국립보건연구원 연구성과 발표', author: '메디컬투데이', date: '2025.03.02' },
    { id: 107, title: '학술 포럼 일정 안내', author: '학회소식', date: '2025.03.01' },
    { id: 108, title: 'NCS 학술 발표 후기', author: '뉴스N', date: '2025.02.28' },
  ];

  // ---------- (2) 공지사항 섹션 ----------
  const noticeList = [
    { id: 1, title: '[필독] 제출자료 업로드 규칙', date: '2025-04-10' },
    { id: 2, title: '[업데이트] 연구자료 게시판 개선', date: '2025-04-08' },
    { id: 3, title: '[안내] 제안서 양식 변경', date: '2025-04-05' },
  ];

  // ---------- (3) 연구 섹션 (동기화 가능한 게시글 데이터) ----------
  const childCategories = ['전체', '연구자료', '제출자료', '제안서'];
  const [researchPostsData] = useState({
    연구자료: [
      { id: 101, tag: '[연구자료]', title: '최신 AI 논문 공유', comments: 3 },
      { id: 102, tag: '[연구자료]', title: '딥러닝 모델 코드 업로드', comments: 2 },
      { id: 103, tag: '[연구자료]', title: '데이터셋 정리', comments: 4 },
      { id: 104, tag: '[연구자료]', title: '추가 자료', comments: 1 },
    ],
    제출자료: [
      { id: 201, tag: '[제출자료]', title: '4월 보고서 제출 안내', comments: 3 },
      { id: 202, tag: '[제출자료]', title: '논문 중간고사 대체 안내', comments: 5 },
      { id: 203, tag: '[제출자료]', title: '추가 자료 안내', comments: 2 },
    ],
    제안서: [
      { id: 301, tag: '[제안서]', title: '신규 연구 프로젝트 제안', comments: 1 },
      { id: 302, tag: '[제안서]', title: 'AR/VR 연구 제안서 업로드', comments: 3 },
      { id: 303, tag: '[제안서]', title: 'IoT 연구 방향 논의', comments: 4 },
      { id: 304, tag: '[제안서]', title: '추가 제안서', comments: 2 },
    ],
  });

  // "전체" 탭: 세 카테고리 합침 (동기화를 위해 useMemo 사용)
  const allPosts = useMemo(() => {
    return [
      ...researchPostsData.연구자료,
      ...researchPostsData.제출자료,
      ...researchPostsData.제안서,
    ].map(item => ({
      ...item,
      tag: item.tag.replace('[', '[전체/'),
    }));
  }, [researchPostsData]);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const currentPosts =
    selectedCategory === '전체'
      ? allPosts
      : researchPostsData[selectedCategory] || [];
  const totalPages = Math.ceil(currentPosts.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageItems = currentPosts.slice(startIndex, endIndex);
  const leftItems = pageItems.slice(0, 5);
  const rightItems = pageItems.slice(5, 10);

  // ---------- 핸들러 ----------
  const handleMainNewsClick = () => {
    alert(`메인 뉴스 클릭: ${mainNews.title}`);
  };
  const handleOtherNewsClick = (news) => {
    alert(`"${news.title}" 클릭 ("/news/${news.id}" 이동)`);
  };

  const handleTabClick = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const handlePostClick = (item) => {
    alert(`[${item.tag}] "${item.title}" ("/board/${item.id}" 이동)`);
  };

  return (
    <div className="main-home-wrapper">
      {/* ---------- 뉴스 섹션 ---------- */}
      <section className="news-section">
        <h2 className="block-title">뉴스</h2>
        <div className="main-news" onClick={handleMainNewsClick}>
          <div className="main-news-title">{mainNews.title}</div>
          <div className="main-news-content">{mainNews.content}</div>
          <div className="main-news-meta">
            <span>{mainNews.author}</span>
            <span>{mainNews.date}</span>
          </div>
        </div>
        <div className="news-lr-container">
          <ul className="news-list left">
            {otherNewsList
              .slice(0, Math.ceil(otherNewsList.length / 2))
              .map((n) => (
                <li key={n.id} className="news-item-row" onClick={() => handleOtherNewsClick(n)}>
                  <span className="news-row-title">{n.title}</span>
                  <span className="news-row-meta">{n.date}</span>
                </li>
              ))}
          </ul>
          <ul className="news-list right">
            {otherNewsList
              .slice(Math.ceil(otherNewsList.length / 2))
              .map((n) => (
                <li key={n.id} className="news-item-row" onClick={() => handleOtherNewsClick(n)}>
                  <span className="news-row-title">{n.title}</span>
                  <span className="news-row-meta">{n.date}</span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* ---------- 공지사항 섹션 ---------- */}
      <section className="notice-section">
        <h2 className="block-title">공지사항</h2>
        <div className="notice-list">
          {noticeList.map((notice) => (
            <div key={notice.id} className="notice-item">
              <span className="notice-title">{notice.title}</span>
              <span className="notice-date">{notice.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 연구 섹션 (탭 + 2컬럼 게시판) ---------- */}
      <section className="research-section">
        <h2 className="block-title">연구</h2>
        <hr className="research-divider" />

        {/* 탭 */}
        <div className="research-tabs-container">
          <ul className="research-tabs">
            {childCategories.map((cat) => (
              <li
                key={cat}
                className={`research-tab-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleTabClick(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* 2컬럼 게시판 */}
        <div className="research-board-2col">
          <div className="board-lr-container">
            <ul className="board-list left">
              {leftItems.map((item) => (
                <li key={item.id} className="board-list-item" onClick={() => handlePostClick(item)}>
                  <span className="board-tag">{item.tag}</span>
                  <span className="board-title">{item.title}</span>
                  <span className="board-comments">({item.comments})</span>
                </li>
              ))}
            </ul>
            <ul className="board-list right">
              {rightItems.map((item) => (
                <li key={item.id} className="board-list-item" onClick={() => handlePostClick(item)}>
                  <span className="board-tag">{item.tag}</span>
                  <span className="board-title">{item.title}</span>
                  <span className="board-comments">({item.comments})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 페이지네이션 */}
          <div className="pagination" style={{ justifyContent: 'flex-end' }}>
            <button className="page-btn" onClick={handlePrevPage} disabled={page <= 1}>
              &lt;
            </button>
            <span className="page-info">
              {page} / {totalPages}
            </span>
            <button className="page-btn" onClick={handleNextPage} disabled={page >= totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainHome;
