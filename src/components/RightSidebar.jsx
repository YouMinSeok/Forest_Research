// src/components/RightSidebar.jsx
import React from 'react';
import './RightSidebar.css';

// 1) 구글/IEEE/ACM 이미지 import
import googleScholar from '../assets/google_scholar.png';
import ieeeXplore from '../assets/ieee_xplore.png';
import acmDl from '../assets/acm_dl.png';

function RightSidebar() {
  // 2) imageUrl 대신 직접 import된 변수 할당
  const paperSites = [
    {
      id: 1,
      siteName: 'Google Scholar',
      imageUrl: googleScholar,
      link: 'https://scholar.google.com'
    },
    {
      id: 2,
      siteName: 'IEEE Xplore',
      imageUrl: ieeeXplore,
      link: 'https://ieeexplore.ieee.org'
    },
    {
      id: 3,
      siteName: 'ACM DL',
      imageUrl: acmDl,
      link: 'https://dl.acm.org'
    }
  ];

  const handleClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <aside className="right-sidebar">
      <div className="paper-card-area">
        <h2>논문 사이트</h2>
        <ul className="paper-card-list">
          {paperSites.map((site) => (
            <li key={site.id} onClick={() => handleClick(site.link)}>
              {/* 3) site.imageUrl는 import된 변수 */}
              <img src={site.imageUrl} alt={site.siteName} />
              <div className="paper-info">
                <span className="paper-name">{site.siteName}</span>
                <span className="paper-desc">바로가기</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="quick-info">
        <h2>Quick Info</h2>
        <ul>
          <li>
            <a
              href="https://www.pcu.ac.kr/graduate"
              target="_blank"
              rel="noopener noreferrer"
            >
              대학원 학사일정
            </a>
          </li>
          <li>인기 논문 Top5</li>
          <li>협업 파트너 찾기</li>
        </ul>
      </div>
    </aside>
  );
}

export default RightSidebar;
