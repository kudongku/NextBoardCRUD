'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 pt-20 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">게시물 목록</h1>
      <div className="w-full max-w-4xl space-y-4">
        {posts.map((post) => (
          <PostThumbnail key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

const PostThumbnail = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-lg shadow-lg hover:bg-gray-100 hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-300">
          {post.title}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
