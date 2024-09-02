import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const commentId = parseInt(req.query.commentId, 10);

  if (isNaN(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  if (req.method === 'PUT') {
    const { comment, password } = req.body;

    if (!comment || !password) {
      return res
        .status(400)
        .json({ message: 'Comment and password are required' });
    }

    try {
      const existingComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (existingComment.password !== password) {
        return res.status(403).json({ message: 'Incorrect password' });
      }

      const updatedComment = await prisma.comment.update({
        where: { id: commentId },
        data: { comment },
      });

      return res.status(200).json(updatedComment);
    } catch (error) {
      console.error('Error updating comment:', error);
      return res.status(500).json({
        message: 'An error occurred while updating the comment',
        error,
      });
    }
  } else if (req.method === 'DELETE') {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    try {
      const existingComment = await prisma.comment.findUnique({
        where: { id: commentId },
      });

      if (!existingComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      if (existingComment.password !== password) {
        return res.status(403).json({ message: 'Incorrect password' });
      }

      await prisma.comment.delete({
        where: { id: commentId },
      });

      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({
        message: 'An error occurred while deleting the comment',
        error,
      });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
