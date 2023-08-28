import jwt from 'jsonwebtoken';
const SECRET:any = process.env.SECRET;
import type {NextApiRequest,NextApiResponse} from 'next';

const authenticateJwt = (req:NextApiRequest, res:NextApiResponse) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err:any, user:any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.headers['user'] = user;
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateJwt;
