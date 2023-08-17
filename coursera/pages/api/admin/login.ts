import { Admin, dbConnect } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'POST') {
        try {
            await dbConnect();
            const { SECRET } = process.env;
            if (!SECRET) {
                throw new Error('Please define the MONGODB_URI environment variable');
            }
            const { username, password } = req.headers;
            const admin = await Admin.findOne({ username, password });
            console.log(admin)
            if (admin) {
                const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
                res.json({ message: 'Logged in successfully', token });
            } else {
                res.status(403).json({ message: 'Invalid username or password' });
            }

        } catch (error) {
            return res.status(500).json({err: error, message: 'Internal Server Error'});
        }
    }
}