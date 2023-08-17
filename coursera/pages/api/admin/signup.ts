import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { Admin, adminType, dbConnect } from "@/lib/db";
import Cookies from "js-cookie";
import cookie from 'cookie'
import { serialize } from "cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(400).json({ message: 'Its a Post request' })
    }
    try {
        await dbConnect();
        const { SECRET } = process.env;
        if (!SECRET) {
            throw new Error('Please define the MONGODB_URI environment variable');
        }
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(403).json({ message: 'Admin already exists' });
        }
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        await newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        const cookieSerialized = serialize('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
          });
        
        res.setHeader('Set-Cookie', cookieSerialized);
        return res.json({ message: 'Admin created successfully', token });


    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
}