'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const currentPath = usePathname();
  const postId = currentPath.split('/')[2]; // 경로에서 ID 추출

  const [post, setPost] = useState({
    title: '',
    author: '',
    password: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [postId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditForm = async () => {
    await fetch(`/api/posts/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
        } else {
          alert('비밀번호가 틀립니다.');
        }
      })
      .catch((error) => {
        alert('수정 중 오류가 발생했습니다.');
        console.error('Error:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시글 수정하기</h1>
      <div>
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          제목
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="author"
          className="block text-gray-700 font-medium mb-2"
        >
          작성자
        </label>
        <input
          id="author"
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-2"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="비밀번호 입력"
          required
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-gray-700 font-medium mb-2"
        >
          내용
        </label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="button"
        onClick={handleEditForm}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        제출
      </button>
    </div>
  );
}
