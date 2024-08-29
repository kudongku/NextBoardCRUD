'use client';

import Buttons from './buttons';
import React, { useEffect, useState } from 'react';

export default function Detail({ params }) {
  const [post, setPost] = useState();

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [params.id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>{post.title}</h1>
      <p>작성자: {post.author}</p>
      <Buttons />
      <p>{post.content}</p>
      <hr />
    </div>
  );
}
