import { Button, Card, Typography } from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";

interface Course {
    title:string;
    description:string;
    _id:number;
    price:number;
    imageLink:string;
    published:boolean;
}

interface CoursesProps {
    courses: Course[];
}

function Courses({courses}:CoursesProps) {

    return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(course => {
            return <Course course={course} />}
        )}
    </div>
}

function Course({course}:{course:Course}) {
    const router = useRouter();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                router.push("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>

}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await axios.get('http://localhost:3000/api/admin/courses/');
    const courses = await res.data.courses;
   
    // Pass data to the page via props
    return { props: { courses } }
}

export default Courses;