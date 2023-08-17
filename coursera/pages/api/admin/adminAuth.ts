import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { json } from "stream/consumers";


export default async function adminAuth(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    const { SECRET } = process.env;
    if (!SECRET || SECRET.length == 0) {
        throw new Error('Please define the MONGODB_URI environment variable');
      }
    const authHeader = req.headers.authorization;
    if (authHeader) {
        let token = authHeader;
        if(authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Cant verify your token' });
            }
            if(!decoded || typeof decoded === 'string' || !decoded.username) {
                return res.status(403).json({ message: "Forbidden!" });
            }
            req.headers['user'] = decoded.username;
            next();
        });
    } else {
        console.log('kksd')
        res.status(401).json({ message: 'Unauthorized' });
    }
}