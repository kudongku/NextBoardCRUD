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
    const { id } = req.query;
    let prePost = await db
      .collection('post')
      .findOne({ _id: new ObjectId(id) });

    if (prePost.password == dto.password) {
      await db
        .collection('post')
        .updateOne({ _id: new ObjectId(id) }, { $set: dto });
      return res.status(200).redirect('/');
    }
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
