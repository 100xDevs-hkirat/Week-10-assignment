import { NextApiResponse } from "next";
import { serialize } from "cookie";

export function setCookie(res: NextApiResponse, name: string, value: string, options = {}) {
    const stringValue = typeof value === 'object' ? 'Bearer ' + JSON.stringify(value) : value;
  
    const cookie = serialize(name, stringValue, options);
    res.setHeader('Set-Cookie', cookie);
  }