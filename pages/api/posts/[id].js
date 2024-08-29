import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method == 'GET') {
    const { id } = req.query;
    let post = await db.collection('post').findOne({ _id: new ObjectId(id) });
    return res.status(200).json(post);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
