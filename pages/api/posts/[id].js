import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching post', error });
    }
  }

  if (req.method === 'POST') {
    let dto = req.body;

    try {
      const prePost = await prisma.post.findUnique({
        where: {
          id: parseInt(req.query.id),
        },
      });

      if (!prePost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const passwordMatch = await bcrypt.compare(
        dto.password,
        prePost.password
      );

      if (passwordMatch) {
        const updatedPost = await prisma.post.update({
          where: {
            id: parseInt(req.query.id),
          },
          data: {
            title: dto.title,
            author: dto.author,
            content: dto.content,
          },
        });

        return res.status(200).json({ message: 'Post updated successfully' });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error updating post', error });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const { password } = req.body;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const passwordMatch = await bcrypt.compare(password, post.password);

      if (passwordMatch) {
        await prisma.post.delete({
          where: {
            id: parseInt(id),
          },
        });

        return res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Error occurred during deletion', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
