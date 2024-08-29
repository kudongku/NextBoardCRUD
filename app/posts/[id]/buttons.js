'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function Buttons() {
  let router = useRouter();
  let currentPath = usePathname();
  let deletePath = '/api' + currentPath + '/delete';
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEditClick = () => {
    router.push(currentPath + '/edit');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}
    >
      {!showDeleteConfirmation && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleEditClick} style={buttonStyle}>
            수정
          </button>
          <button onClick={handleDeleteClick} style={buttonStyle}>
            삭제
          </button>
        </div>
      )}
      {showDeleteConfirmation && (
        <form action={deletePath} method="POST">
          <div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              onChange={handlePasswordChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              style={{
                ...buttonStyle,
                background: 'red',
              }}
            >
              삭제 확인
            </button>
            <button
              onClick={handleDeleteClick}
              style={{
                ...buttonStyle,
              }}
            >
              삭제 취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// 버튼 스타일
const buttonStyle = {
  padding: '10px 20px',
  background: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
