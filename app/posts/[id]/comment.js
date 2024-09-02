import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const currentPath = usePathname();
  const postId = currentPath.split('/')[2];

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await fetch('/api' + currentPath + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetch(`/api/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    });

    event.target.reset();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 pt-20 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-4xl">
        <div className="flex space-x-4">
          <input
            id="author"
            type="text"
            name="author"
            placeholder="작성자 명"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>
        <div className="flex items-center space-x-4">
          <input
            id="comment"
            type="text"
            name="comment"
            placeholder="댓글 입력"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            확인
          </button>
        </div>
      </form>

      <div className="w-full max-w-4xl space-y-4 mt-6">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            postId={postId}
            onUpdate={() =>
              fetch(`/api/posts/${postId}/comments`).then((response) =>
                response.json().then((data) => setComments(data))
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

const Comment = ({ comment, postId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [password, setPassword] = useState('');

  const handleEditSubmit = async () => {
    await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: editText, password }),
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleDeleteSubmit = async () => {
    await fetch(`/api/posts/${postId}/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    setIsDeleting(false);
    onUpdate();
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleEditSubmit}
            className="px-3 py-1.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            수정 완료
          </button>
        </>
      ) : isDeleting ? (
        <>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleDeleteSubmit}
            className="px-3 py-1.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
          >
            삭제 완료
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-black-700">
              {comment.comment}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 bg-blue-300 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                ✍️
              </button>
              <button
                onClick={() => setIsDeleting(true)}
                className="px-2 py-1 bg-red-300 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
              >
                🗑️
              </button>
            </div>
          </div>
          <div className="mt-1 text-sm text-gray-500">{comment.author}</div>
        </>
      )}
    </div>
  );
};
