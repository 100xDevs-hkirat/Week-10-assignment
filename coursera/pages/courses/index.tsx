import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { CourseType } from "@/lib/db";
import cookie from 'cookie'

const Courses: React.FC<{ courses: CourseType[] }> = ({ courses }) => {


    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.length > 0 && courses.map((course: CourseType) => {
            return <Course course={course} />
        }
        )}
    </div>
}

export const Course: React.FC<{ course: CourseType }> = ({ course }) => {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300 }} ></img>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>

}



export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        
        const cookies = context.req.headers.cookie;
        const parsedCookie = cookie.parse(cookies || '');
        const token = parsedCookie.jwtToken;
        if(!token) {
            return {
                props: {
                    courses: []
                }
            }
        }
        const response = await axios.get(`${BASE_URL}/api/admin/courses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const courses: CourseType[] = response.data.courses;
        return {
            props: {
                courses
            }
        }
    } catch (error) {
        return {
            props: {
                courses: []
            }
        }
    }

}

export default Courses;