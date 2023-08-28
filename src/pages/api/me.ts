import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/utils/db';
import {Admin} from '@/utils/model'
import type {NextApiRequest,NextApiResponse} from 'next';
import authenticateJwt from '@/middlewares/auth';

connectToDatabase();

const SECRET:any=process.env.SECRET;

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    authenticateJwt(req,res);
    const user:any=req.headers['user'];
    const username=user.username;

    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(403).json({msg: "Admin doesnt exist"})
      
    }
    return res.json({
        username: admin.username
    })

};