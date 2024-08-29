import { connectDB } from '@/util/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  const db = (await connectDB).db('board');

  if (req.method == 'POST') {
    let dto = req.body;
    const requiredFields = ['title', 'author', 'password', 'content'];

    for (let field of requiredFields) {
      if (!dto[field] || dto[field].trim() === '') {
        return res.status(500).json(`${field}을(를) 입력하세요`);
      }
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    await db.collection('post').insertOne(dto);
    return res.status(201).redirect('/');
  }

  if (req.method == 'GET') {
    let posts = await db.collection('post').find().toArray();
    return res.status(200).json(posts);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
