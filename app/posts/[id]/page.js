'use client';

import Buttons from './buttons';
import React, { useEffect, useState } from 'react';

export default function Detail({ params }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [params.id]);

  if (!post) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">작성자: {post.author}</p>
      <Buttons />
      <p className="text-gray-800 mt-4">{post.content}</p>
      <hr className="my-6 border-gray-300" />
    </div>
  );
}
