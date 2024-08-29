import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method == 'POST') {
    let password = req.body.password;
    const { id } = req.query;
    let post = await db.collection('post').findOne({ _id: new ObjectId(id) });

    if (post.password == password) {
      await db.collection('post').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).redirect('/');
    }

    return res.status(400).redirect('/');
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
