export default function Home() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>게시글 작성하기</h1>
      <form action="/api/posts" method="post">
        <div style={{ marginBottom: '15px' }}>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="제목"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            id="author"
            type="text"
            name="author"
            placeholder="작성자명"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            id="content"
            name="content"
            placeholder="글 내용"
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
