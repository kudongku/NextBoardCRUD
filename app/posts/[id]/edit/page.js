'use client';

import React, { useEffect, useState } from 'react';

export default function Home({ params }) {
  const [post, setPost] = useState(null);
  const url = `/api/posts/${params.id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [url]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">게시글 수정하기</h1>
      <form action={url} method="post" className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={post.title}
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
            defaultValue={post.author}
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
            placeholder="password"
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
            defaultValue={post.content}
            required
            rows={10}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          제출
        </button>
      </form>
    </div>
  );
}
