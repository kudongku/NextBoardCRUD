'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function Buttons() {
  const router = useRouter();
  const currentPath = usePathname();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleDeleteConfirmation = async () => {
    await fetch('/api' + currentPath + '/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
        } else {
          alert('비밀번호가 잘못되었습니다.');
        }
      })
      .catch((error) => {
        alert('삭제 중 오류가 발생했습니다, ', error);
      });
  };

  return (
    <div className="flex justify-end mb-5">
      {!showDeleteConfirmation ? (
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(currentPath + '/edit')}
            className="px-3 py-1.5 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-600 hover:scale-110 hover:shadow-lg transition-transform transition-shadow duration-300 ease-in-out text-sm"
          >
            ✍️
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-3 py-1.5 bg-red-300 text-white font-semibold rounded-lg hover:bg-red-600 hover:scale-110 hover:shadow-lg transition-transform transition-shadow duration-300 ease-in-out text-sm"
          >
            🗑️
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            onChange={handlePasswordChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleDeleteConfirmation}
              className="px-3 py-1.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 hover:scale-110 hover:shadow-lg transition-transform transition-shadow duration-300 ease-in-out text-sm"
            >
              삭제 확인
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="px-3 py-1.5 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 hover:scale-110 hover:shadow-lg transition-transform transition-shadow duration-300 ease-in-out text-sm"
            >
              삭제 취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
