import mongoose from "mongoose";
import {Admin} from '@/utils/model'
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/utils/db';


import type {NextApiRequest,NextApiResponse} from 'next';


type resData={
    message:string,
    token?:string
}

const SECRET:any=process.env.SECRET;

connectToDatabase();


export default async function handler(req:NextApiRequest,res:NextApiResponse<resData>){
         
    console.log(req.body);
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }

};