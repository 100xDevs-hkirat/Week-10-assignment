import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import Cookies from "js-cookie";
import { useRouter } from "next/router.js";
import { error } from "console";

function AddCourse() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    const token = Cookies.get('token');

    return (
        <>
            <div className="h-screen bg-gray-100 flex justify-center items-center">
                <div className="flex flex-col gap-y-4 bg-white p-10 w-[500px] rounded-xl shadow-lg hover:shadow-2xl transition-all" style={{ display: "flex", justifyContent: "center" }}>
                    <Typography>
                        Add Course
                    </Typography>
                    <div className="">
                        <TextField
                            style={{ marginBottom: 10 }}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            fullWidth={true}
                            label="Title"
                            variant="outlined"
                        />

                        <TextField
                            style={{ marginBottom: 10 }}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            fullWidth={true}
                            label="Description"
                            variant="outlined"
                        />

                        <TextField
                            style={{ marginBottom: 10 }}
                            onChange={(e) => {
                                setImage(e.target.value)
                            }}
                            fullWidth={true}
                            label="Image link"
                            variant="outlined"
                        />

                        <TextField
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
                            size={"large"}
                            variant="contained"
                            onClick={async () => {
                                try {
                                    await axios.post(`${BASE_URL}/api/admin/courses`, {
                                        title: title,
                                        description: description,
                                        imageLink: image,
                                        published: true,
                                        price
                                    }, {
                                        headers: {
                                            "Authorization": `Bearer ${token}`
                                        }
                                    });
                                    alert("Added course!");
                                    router.push('/courses');
                                    
                                } catch (error: any ) {
                                    if(error && Object.keys(error).includes('response')) {
                                        if(!error?.response?.data?.isAuth) {
                                            Cookies.remove('token');
                                            router.push('/signin');
                                        }
                                    }
                                }
                            }}
                        > Add course</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourse;