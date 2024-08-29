import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method == 'GET') {
    const { id } = req.query;
    let post = await db.collection('post').findOne({ _id: new ObjectId(id) });
    return res.status(200).json(post);
  }

  if (req.method == 'POST') {
    let dto = req.body;
    let prePost = await db
      .collection('post')
      .findOne({ _id: new ObjectId(dto._id) });

    if (prePost.password == dto.password) {
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

      return res.status(200).redirect('/');
    }
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (req.method == 'DELETE') {
    try {
      let { password } = req.body;
      const { id } = req.query;
      let post = await db.collection('post').findOne({ _id: new ObjectId(id) });

      if (post.password == password) {
        await db.collection('post').deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: '성공적으로 삭제됨' });
      }
      return res.status(400).json({ message: '비밀번호가 틀립니다.' });
    } catch (error) {
      res.status(500).json({ message: error.body });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
