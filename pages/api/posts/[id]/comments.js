import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const postId = parseInt(req.query.id, 10);
      const dto = req.body;

      const newComment = await prisma.comment.create({
        data: {
          postId: postId,
          author: dto.author,
          password: dto.password,
          comment: dto.comment,
        },
      });

      return res.status(200).json(newComment);
    } catch (error) {
      return res
        .status(500)
        .json({ message: '댓글 생성 중 오류가 발생했습니다.', error });
    }
  }

  if (req.method === 'GET') {
    try {
      const postId = req.query.id;

      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(postId),
        },
      });

      return res.status(200).json(comments);
    } catch (error) {
      return res
        .status(500)
        .json({ message: '댓글 조회 중 오류가 발생했습니다.', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
