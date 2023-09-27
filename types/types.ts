import { NextApiRequest } from "next";

export type Course = {
    title: string;
    description: string;
    imageLink: string;
    price: number,
    _id?: string;
    published?: boolean;
}
export type DataWithCourseType = {
    message?: string;
    course?: Course;
}
export interface JwtPayload {
    username?: string;
}
export type Data = {
    message?: string;
    courseId?: number;
    courses?: any,
    username?: JwtPayload | string
}
export interface ContextType {
    req: NextApiRequest
}


export interface CoursesProps {
    courses: Course[];
}