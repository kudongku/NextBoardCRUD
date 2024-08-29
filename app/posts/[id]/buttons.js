'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function Buttons() {
  const router = useRouter();
  const currentPath = usePathname();
  const deletePath = '/api' + currentPath + '/delete';
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [password, setPassword] = useState('');

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
    <div className="flex justify-end mb-5">
      {!showDeleteConfirmation ? (
        <div className="flex space-x-2">
          <button
            onClick={handleEditClick}
            className="px-3 py-1.5 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
          >
            ✍️
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-3 py-1.5 bg-red-300 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 text-sm"
          >
            🗑️
          </button>
        </div>
      ) : (
        <form
          action={deletePath}
          method="POST"
          className="flex flex-col space-y-4"
        >
          <div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 text-sm"
            >
              삭제 확인
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="px-3 py-1.5 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300 text-sm"
            >
              삭제 취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
