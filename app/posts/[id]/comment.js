import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const currentPath = usePathname();
  const postId = currentPath.split('/')[2];

  useEffect(() => {
    fetch(`/api/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [postId]);

  const handleCommentCreate = async () => {
    await fetch('/api' + currentPath + '/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: commentInput,
        password: passwordInput,
        author: authorInput,
      }),
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 pt-20 rounded-lg">
      <input
        id="author"
        type="text"
        name="author"
        placeholder="작성자 명"
        value={authorInput}
        onChange={(event) => setAuthorInput(event.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <input
        id="password"
        type="password"
        name="password"
        placeholder="비밀번호 입력"
        value={passwordInput}
        onChange={(event) => setPasswordInput(event.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <input
        id="comment"
        type="text"
        name="comment"
        placeholder="댓글 입력"
        value={commentInput}
        onChange={(event) => setCommentInput(event.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <button
        onClick={handleCommentCreate}
        className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-red-700 hover:scale-110 hover:shadow-lg transition-transform transition-shadow duration-300 ease-in-out text-sm"
      >
        확인
      </button>

      <div className="w-full max-w-4xl space-y-4">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

const Comment = ({ comment }) => {
  const router = useRouter();

  const handleCommentClick = () => {
    router.push(`/posts/${comment._id}`);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg ">
      <div className="text-lg font-semibold text-BLACK-700">
        {comment.comment}
      </div>

      <div>{comment.author}</div>
    </div>
  );
};
