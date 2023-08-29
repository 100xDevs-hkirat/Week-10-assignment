import mongoose from "mongoose";
import {Admin} from '@/utils/model'
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/utils/db';


import type {NextApiRequest,NextApiResponse} from 'next';


type resData={
    message:string,
    token?:string
}

const secret:any=process.env.SECRET;

connectToDatabase();


export default function handler(req:NextApiRequest,res:NextApiResponse<resData>){
        console.log(req.body);
        const { username, password } = req.body;
        function callback(admin:any) {
            if (admin) {
                res.status(403).json({ message: 'Admin already exists' });
            } else {
                const obj = { username: username, password: password };
                const newAdmin = new Admin(obj);
                newAdmin.save();
                const token = jwt.sign({ username, role: 'admin' }, secret, { expiresIn: '1h' });
                res.json({ message: 'Admin created successfully', token });
            }
    
        }
        Admin.findOne({ username }).then(callback);
};