import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CafeWritePost.css';

function CafeWritePost({ boardList, onSubmit }) {
  const [selectedBoard, setSelectedBoard] = useState('');
  // 공지사항 등에서 사용할 말머리 (1차)
  const [selectedPrefix, setSelectedPrefix] = useState('');
  // 제안서에서 사용할 2차 말머리 (선택)
  const [selectedSecondPrefix, setSelectedSecondPrefix] = useState('');
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [tags, setTags] = useState('');

  // 공지사항 말머리 (괄호 없이)
  const prefixOptions = {
    '공지사항': ['필독', '공지', '업데이트'],
  };

  // 제안서 2차 말머리 (첫 옵션은 "선택안함")
  // 역시 괄호 없이
  const secondPrefixOptions = [
    { value: '', label: '선택안함' },
    { value: '초안', label: '초안' },
    { value: '1차 피드백 요청', label: '1차 피드백 요청' },
    { value: '2차 피드백 요청', label: '2차 피드백 요청' },
    { value: '수정중', label: '수정중' },
    { value: '최종안', label: '최종안' },
    { value: '완료', label: '완료' },
    { value: '보류', label: '보류' },
  ];

  // Quill 설정
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }, { size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBoard) {
      alert('게시판을 선택하세요.');
      return;
    }
    if (!title.trim()) {
      alert('제목을 입력하세요.');
      return;
    }
    if (!editorContent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }

    let finalPrefix = '';
    // 1) 공지사항: 말머리 필수
    if (selectedBoard === '공지사항') {
      if (!selectedPrefix) {
        alert('말머리를 선택하세요.');
        return;
      }
      // 최종적으로 [필독] 형태로
      finalPrefix = `[${selectedPrefix}]`;
    }
    // 2) 제안서: 1차 "[제안서]" 고정, 2차는 선택
    else if (selectedBoard === '제안서') {
      finalPrefix = '[제안서]';
      if (selectedSecondPrefix) {
        // 2차 말머리가 "초안"이라면 최종적으로 [초안] 형태가 추가
        finalPrefix += ` [${selectedSecondPrefix}]`;
      }
    }
    // 3) 그 외 게시판: 말머리 없음
    else {
      finalPrefix = '';
    }

    const tagArr = tags.split(' ').map(t => t.trim()).filter(t => t);

    const newPost = {
      // 임시 id
      id: Date.now(),
      board: selectedBoard,
      prefix: finalPrefix,
      title,
      content: editorContent,
      tags: tagArr,
      date: new Date().toISOString().split('T')[0],
      writer: '테스트사용자',
      views: 0,
    };

    onSubmit(newPost);

    // 폼 리셋
    setSelectedBoard('');
    setSelectedPrefix('');
    setSelectedSecondPrefix('');
    setTitle('');
    setEditorContent('');
    setTags('');
  };

  // 게시판 변경 시 말머리 초기화
  const handleBoardChange = (e) => {
    const board = e.target.value;
    setSelectedBoard(board);

    if (board === '공지사항') {
      // 공지사항: prefixOptions 중 첫 번째 값으로 초기화
      setSelectedPrefix(prefixOptions[board][0]); // 예: "필독"
      setSelectedSecondPrefix('');
    } else if (board === '제안서') {
      // 제안서: 1차 고정, 2차 말머리는 선택안함으로 시작
      setSelectedPrefix('제안서'); // 내부적 저장(괄호 없이)
      setSelectedSecondPrefix('');
    } else {
      setSelectedPrefix('');
      setSelectedSecondPrefix('');
    }
  };

  return (
    <form className="cafe-write-form" onSubmit={handleSubmit}>
      <h2>글쓰기</h2>

      <div className="form-row">
        <label>게시판 선택</label>
        <select value={selectedBoard} onChange={handleBoardChange} required>
          <option value="">게시판을 선택하세요</option>
          {boardList.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* 공지사항 게시판 */}
      {selectedBoard === '공지사항' && (
        <div className="form-row">
          <label>말머리 선택</label>
          <select
            value={selectedPrefix}
            onChange={(e) => setSelectedPrefix(e.target.value)}
            required
          >
            {prefixOptions['공지사항'].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {/* 제안서 게시판 */}
      {selectedBoard === '제안서' && (
        <>
          <div className="form-row">
            <label>1차 말머리</label>
            {/* 고정값: [제안서]로 표시, 실제 내부에는 "제안서"만 저장 */}
            <input type="text" value="[제안서]" readOnly />
          </div>
          <div className="form-row">
            <label>2차 말머리 (선택)</label>
            <select
              value={selectedSecondPrefix}
              onChange={(e) => setSelectedSecondPrefix(e.target.value)}
            >
              {secondPrefixOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </>
      )}

      <div className="form-row">
        <label>제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          formats={formats}
          placeholder="내용을 입력하세요."
        />
      </div>

      <div className="form-row">
        <label>태그 (예: #태그1 #태그2)</label>
        <input
          type="text"
          placeholder="#태그 입력 (공백으로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">작성하기</button>
    </form>
  );
}

export default CafeWritePost;
