'use client';

import React, { useEffect, useState } from 'react';

export default function Home({ params }) {
  const [post, setPost] = useState();
  const url = '/api/posts/' + params.id;

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [params.id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>게시글 수정하기</h1>
      <form action={url} method="post">
        <div style={{ marginBottom: '15px' }}>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={post.title}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={post.author}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={post.password}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            id="content"
            name="content"
            defaultValue={post.content}
            required
            rows={10}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          제출
        </button>
      </form>
    </div>
  );
}
