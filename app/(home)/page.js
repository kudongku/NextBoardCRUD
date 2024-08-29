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
    <div>
      <h1 className="title">게시물</h1>
      {posts.map((post, i) => (
        <PostThumbnail key={i} index={i} post={post} />
      ))}
    </div>
  );
}

function PostThumbnail({ index, post }) {
  return (
    <div className="post-thumbnail" key={index}>
      <Link href={`/posts/` + post._id}>{post.title}</Link>
    </div>
  );
}
