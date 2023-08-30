/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next'

type responseData = {
    message?:string
}
export default async function (req:NextApiRequest, res:NextApiResponse<responseData>) {
  const { cookies } = req;

  const jwt = cookies.courseraJWT;

  if (!jwt) {
    return res.json({ message: "Bro you are already not logged in..." });
  } else {
    const serialised = serialize("courseraJWT", null, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}