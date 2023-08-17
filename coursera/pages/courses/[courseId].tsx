import { Card, Grid } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";
import { courseState } from "../../store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseTitle, coursePrice, isCourseLoading, courseImage } from "../../store/selector/course";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import cookie from 'cookie'
import { CourseType } from "@/lib/db";
import Cookies from "js-cookie";

const Course: React.FC<{ course: CourseType }> = ({ course }) => {
    const setCourse = useSetRecoilState(courseState);

    useEffect(() => {
        setCourse({ isLoading: false, course: course });
    }, [course]);

    

    return (
        <>
            {<div className="bg-gray-100 h-screen">
                {course.title.length > 0 && <div>
                    <GrayTopper />
                    <Grid container>
                        <Grid item lg={8} md={12} sm={12}>
                            <UpdateCard />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12}>
                            <CourseCard />
                        </Grid>
                    </Grid>
                </div>}
            </div>}
        </>
    )
}

function GrayTopper() {
    const title = useRecoilValue(courseTitle);
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard() {
    const [courseDetails, setCourse] = useRecoilState(courseState);
    const router = useRouter();
    const [title, setTitle] = useState(courseDetails?.course?.title);
    const [description, setDescription] = useState(courseDetails.course.description);
    const [image, setImage] = useState(courseDetails.course.imageLink);
    const [price, setPrice] = useState(courseDetails.course.price);

    return <div style={{ display: "flex", justifyContent: "center" }}>
        {courseDetails?.course?.title.length > 5 &&  <div className="bg-white absolute top-[200px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-linear">
            <div style={{ padding: 20 }}>
                <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                <TextField
                    value={title}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    value={description}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    value={image}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />
                <TextField
                    value={price}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setPrice(parseInt(e.target.value))
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    className="bg-blue-500"
                    variant="contained"
                    onClick={async () => {
                        try {
                            
                            axios.put(`${BASE_URL}/api/admin/course/` + courseDetails.course._id, {
                                title: title,
                                description: description,
                                imageLink: image,
                                published: true,
                                price
                            }, {
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": "Bearer " + Cookies.get('token')
                                }
                            });
                            let updatedCourse = {
                                _id: courseDetails.course._id,
                                title: title,
                                description: description,
                                imageLink: image,
                                price,
                                published: true
                            };
                            setCourse({ course: updatedCourse, isLoading: false });
                        } catch (error: any ) {
                            if(error && Object.keys(error).includes('response')) {
                                if(!error?.response?.data?.isAuth) {
                                    Cookies.remove('token');
                                    router.push('/signin');
                                }
                            }
                        }
                    }}
                > Update course</Button>
            </div>
        </div>}
    </div>
}

function CourseCard() {
    const title = useRecoilValue(courseTitle);
    const imageLink = useRecoilValue(courseImage);

    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card
            className="shadow-lg hover:shadow-2xl transition-all duration-200"
            style={{
                margin: 10,
                width: 350,
                minHeight: 200,
                borderRadius: 20,
                marginRight: 50,
                paddingBottom: 15,
                zIndex: 2
            }}>
            <img src={imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{title}</Typography>
                <Price />
            </div>
        </Card>
    </div>
}

function Price() {

    const price = useRecoilValue(coursePrice);
    return <>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
        </Typography>
        <Typography variant="subtitle1">
            <b>Rs {price} </b>
        </Typography>
    </>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = context.req.headers.cookie;
        const parsedCookie = cookie.parse(cookies || '');
        const token = parsedCookie.jwtToken;
        const courseId = context.params?.courseId;

        const response = await axios.get(`${BASE_URL}/api/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return {
            props: {
                course: response.data.course
            }
        }


    } catch (error) {
        console.log(error)
        return {
            props: {
                course: {}
            }
        }
    }
}

export default Course;