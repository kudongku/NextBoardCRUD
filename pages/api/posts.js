import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method == 'POST') {
    let dto = req.body;
    const requiredFields = ['title', 'author', 'password', 'content'];

    for (let field of requiredFields) {
      if (!dto[field] || dto[field].trim() === '') {
        return res.status(500).json(`${field}을(를) 입력하세요`);
      }
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    try {
      const newPost = await prisma.post.create({
        data: {
          title: dto.title,
          author: dto.author,
          password: dto.password,
          content: dto.content,
        },
      });
      return res.status(201).json(newPost);
    } catch (error) {
      return res
        .status(500)
        .json({ message: '게시물 작성 중 오류가 발생했습니다.', error });
    }
  }

  if (req.method == 'GET') {
    try {
      const posts = await prisma.post.findMany();
      return res.status(200).json(posts);
    } catch (error) {
      return res
        .status(500)
        .json({ message: '게시물 조회 중 오류가 발생했습니다.', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
