import React, { useState } from 'react';
import './MainHome.css';

/**
 * 메인화면:
 * 1) 뉴스 섹션 (상단)
 * 2) 공지사항 섹션
 * 3) "연구" 부모 아래 자식 카테고리(전체, 연구자료, 제출자료, 제안서)
 *    - 각 자식 카테고리마다 개별 페이지네이션 (페이지당 5개 아이템)
 *    - 각 카테고리에는 게시글 제목만 보여주고, 클릭 시 해당 게시판으로 이동(현재 alert)
 */
function MainHome() {
  // 뉴스 섹션 데이터
  const newsList = [
    { id: 1, title: '박사까지 뚫는데 백수 30%, 역대 최고...', date: '2025-04-15' },
    { id: 2, title: 'NCS 학술 발표, 대학원생들 관심 폭주', date: '2025-04-14' },
    { id: 3, title: '대학원 온라인 세미나 개최 안내', date: '2025-04-13' },
  ];

  // 공지사항 섹션 데이터
  const noticeList = [
    { id: 1, title: '[필독] 제출자료 업로드 규칙', date: '2025-04-10' },
    { id: 2, title: '[업데이트] 연구자료 게시판 개선', date: '2025-04-08' },
    { id: 3, title: '[안내] 제안서 양식 변경', date: '2025-04-05' },
  ];

  // 연구 섹션 자식 카테고리 및 게시글 데이터
  const childCategories = ['전체', '연구자료', '제출자료', '제안서'];
  const postsData = {
    전체: [
      '[전체] 논문 공유합니다',
      '[전체] 세미나 일정 안내',
      '[전체] 연구 협업 모집',
      '[전체] AI 실험 결과',
      '[전체] 실험 장비 대여 안내',
      '[전체] 추가 게시글1',
      '[전체] 추가 게시글2',
    ],
    연구자료: [
      '[연구자료] 최신 AI 논문 공유',
      '[연구자료] 딥러닝 모델 코드 업로드',
      '[연구자료] 데이터셋 정리',
      '[연구자료] 추가 자료',
    ],
    제출자료: [
      '[제출자료] 4월 보고서 제출 안내',
      '[제출자료] 논문 중간고사 대체 안내',
      '[제출자료] 추가 자료 안내',
    ],
    제안서: [
      '[제안서] 신규 연구 프로젝트 제안',
      '[제안서] AR/VR 연구 제안서 업로드',
      '[제안서] IoT 연구 방향 논의',
      '[제안서] 추가 제안서',
    ],
  };

  // 페이지당 아이템 수
  const pageSize = 5;
  // 각 카테고리의 현재 페이지 상태 (객체: 카테고리 => 페이지 번호)
  const [pageNumbers, setPageNumbers] = useState({
    전체: 1,
    연구자료: 1,
    제출자료: 1,
    제안서: 1,
  });

  // 게시글 클릭 시 처리 (실제 구현: navigate() 이용)
  const handleClickItem = (cat, title) => {
    alert(`"${title}" 클릭됨\n(실제 구현 시, "/board/${cat}"로 이동)`);
  };

  // 페이지네이션 컨트롤: 특정 카테고리에 대해 이전/다음 페이지로 변경
  const handlePrevPage = (cat) => {
    setPageNumbers((prev) => ({
      ...prev,
      [cat]: prev[cat] > 1 ? prev[cat] - 1 : 1,
    }));
  };

  const handleNextPage = (cat) => {
    const totalPages = Math.ceil((postsData[cat] || []).length / pageSize);
    setPageNumbers((prev) => ({
      ...prev,
      [cat]: prev[cat] < totalPages ? prev[cat] + 1 : totalPages,
    }));
  };

  // 렌더링: 각 카테고리 별로 개별 컬럼 (Flex Box)로 표시
  return (
    <div className="main-home-wrapper">
      {/* 뉴스 섹션 */}
      <section className="block news-section">
        <h2 className="block-title">뉴스</h2>
        <div className="news-list">
          {newsList.map((news) => (
            <div key={news.id} className="news-item">
              <div className="news-head">
                <span className="news-title">{news.title}</span>
                <span className="news-date">{news.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 공지사항 섹션 */}
      <section className="block notice-section">
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

      {/* 연구 섹션 */}
      <section className="block research-section">
        <h2 className="research-title">연구</h2>
        <hr className="research-divider" />

        {/* 가로 탭 영역: 각 자식 카테고리별 게시글 목록 (개별 pagination 적용) */}
        <div className="research-categories">
          {childCategories.map((cat) => {
            const currentPage = pageNumbers[cat];
            const items = postsData[cat] || [];
            const totalPages = Math.ceil(items.length / pageSize);
            const visibleItems = items.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            );

            return (
              <div key={cat} className="category-column">
                <div className="category-header">{cat}</div>
                
                {/* 게시글 영역 + 페이지네이션을 수직으로 배치 */}
                <div className="category-body">
                  {/* 게시글 목록 */}
                  <div className="category-items">
                    {visibleItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="category-item"
                        onClick={() => handleClickItem(cat, item)}
                      >
                        {item}
                      </div>
                    ))}
                    {visibleItems.length === 0 && (
                      <div className="no-item">게시글이 없습니다.</div>
                    )}
                  </div>

                  {/* 페이지네이션 영역 */}
                  <div className="pagination">
                    <button
                      className="page-btn"
                      onClick={() => handlePrevPage(cat)}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </button>
                    <span className="page-info">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      className="page-btn"
                      onClick={() => handleNextPage(cat)}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default MainHome;
