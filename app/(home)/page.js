'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 pt-20">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">게시물 목록</h1>
      <div className="w-full max-w-4xl space-y-4">
        {posts.map((post) => (
          <PostThumbnail key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

const PostThumbnail = ({ post }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
      <Link
        href={`/posts/` + post._id}
        className="text-lg font-semibold text-blue-700 hover:underline"
      >
        {post.title}
      </Link>
    </div>
  );
};
