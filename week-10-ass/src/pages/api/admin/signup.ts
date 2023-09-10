import { AdminModel,Admin } from '@/db/index';
import { connectDB } from '@/db/connect';
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateToken } from '@/auth/session';

interface SignupRequest {
    username : string,
    password : string,
}

interface SignupResponse{
    message : string,
    token : string | null,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
    await connectDB();
    const { username, password } = req.body;
    function callback(admin : Admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' , token : null });
      } else {
        const obj = { username: username, password: password };
        const newAdmin = new AdminModel(obj);
        newAdmin.save();
    
        const token = generateToken(username,'ADMIN');
        res.setHeader('Set-Cookie', 'auth-token=' + token +'; Max-Age=3600; Path=/');
        res.json({ message: 'Admin created successfully', token });

      }
    
    }
    AdminModel.findOne({ username }).then(callback);
}
