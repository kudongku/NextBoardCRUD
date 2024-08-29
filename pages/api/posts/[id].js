import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method === 'GET') {
    const { id } = req.query;
    let post = await db.collection('post').findOne({ _id: new ObjectId(id) });
    return res.status(200).json(post);
  }

  if (req.method === 'POST') {
    let dto = req.body;
    let prePost = await db
      .collection('post')
      .findOne({ _id: new ObjectId(dto._id) });

    if (!prePost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const passwordMatch = await bcrypt.compare(dto.password, prePost.password);

    if (passwordMatch) {
      await db.collection('post').updateOne(
        { _id: new ObjectId(dto._id) },
        {
          $set: {
            title: dto.title,
            author: dto.author,
            content: dto.content,
          },
        }
      );

      return res.status(200).json({ message: 'Post updated successfully' });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      let { password } = req.body;
      const { id } = req.query;
      let post = await db.collection('post').findOne({ _id: new ObjectId(id) });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const passwordMatch = await bcrypt.compare(password, post.password);

      if (passwordMatch) {
        await db.collection('post').deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error occurred during deletion', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
