import {SECRET} from '@/config'
import jwt from 'jsonwebtoken'

export type UserAuth = {
    username : string,
    role : string,
}

export function generateToken(username : string , role : string) : string {
    const payload : UserAuth = {
        username, role: 'admin'
    }
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

type Cookie = {
    [key : string] : string
}

function getTokenFromCookie(cookieHeader : string){
    const cookies = cookieHeader.split(';').reduce((cookiesObject : Cookie, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookiesObject[name] = value;
        return cookiesObject;
      }, {});
    console.log(cookies);
    return cookies['auth-token'];
}

export function validateToken(cookieHeader : string | null | undefined) : UserAuth | null{
    if (!cookieHeader) return null;
    const token = getTokenFromCookie(cookieHeader);
    const verifiedUser : UserAuth = jwt.verify(token, SECRET, (err: Error, user : UserAuth) => {
        if (err) {
          console.log('AUTH_ERROR:',err);
          return null;
        }
        return user;
       
      });
    return verifiedUser;
}