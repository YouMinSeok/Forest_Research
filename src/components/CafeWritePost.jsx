// src/components/CafeWritePost.jsx
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CafeWritePost.css';

function CafeWritePost({ boardList, onSubmit }) {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [tags, setTags] = useState('');

  // 간소화 툴바
  const modules = {
    toolbar: [
      // 헤더 + 글자크기
      [{ header: [1, 2, false] }, { size: ['small', false, 'large', 'huge'] }],
      // 굵게, 기울임, 밑줄, 취소선
      ['bold', 'italic', 'underline', 'strike'],
      // 리스트(순서,비순서)
      [{ list: 'ordered' }, { list: 'bullet' }],
      // 링크, 이미지
      ['link', 'image'],
      // 서식 제거
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

    const tagArr = tags.split(' ').map(t => t.trim()).filter(t => t);

    const newPost = {
      id: Date.now(),
      board: selectedBoard,
      title,
      content: editorContent,
      tags: tagArr,
      date: new Date().toISOString().split('T')[0],
      writer: '테스트사용자',
      views: 0,
    };

    onSubmit(newPost);
    setSelectedBoard('');
    setTitle('');
    setEditorContent('');
    setTags('');
  };

  return (
    <form className="cafe-write-form" onSubmit={handleSubmit}>
      <h2>글쓰기</h2>

      <div className="form-row">
        <label>게시판 선택</label>
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
          required
        >
          <option value="">게시판을 선택하세요</option>
          {boardList.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

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
