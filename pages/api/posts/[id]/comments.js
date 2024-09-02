import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method === 'POST') {
    let dto = req.body;
    dto.postId = new ObjectId(req.query);
    await db.collection('comment').insertOne(dto);
    return res.status(200).json(dto);
  }

  if (req.method === 'GET') {
    const postId = new ObjectId(req.query);

    let comments = await db
      .collection('comment')
      .find({ postId: postId })
      .toArray();

    return res.status(200).json(comments);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
