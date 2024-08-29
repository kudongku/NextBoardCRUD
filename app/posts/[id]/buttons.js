'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Buttons() {
  let router = useRouter();
  let currentPath = usePathname();

  const handleClick = () => {
    router.push(currentPath + '/edit');
  };

  const handleDelete = () => {
    router.push('/edit');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}
    >
      <button onClick={handleClick} style={buttonStyle}>
        수정
      </button>
      <button onClick={handleDelete} style={buttonStyle}>
        삭제
      </button>
    </div>
  );
}

// 버튼 스타일
const buttonStyle = {
  padding: '10px 20px',
  background: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
