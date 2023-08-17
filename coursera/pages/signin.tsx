import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useRouter } from 'next/router.js';
import { BASE_URL } from '@/config';
import Cookies from 'js-cookie';

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useRouter()
    const setUser = useSetRecoilState(userState);

    return (
        <>
            <>
                <div className="flex justify-center items-center bg-gray-100 h-screen">

                    <div className='flex flex-col gap-y-3 justify-center items-center shadow-lg rounded-xl p-10 bg-white hover:shadow-2xl transition-all duration-300'>
                        <div className=''>
                            <Typography variant={"h6"}>
                                Welcome Back. Sign in below
                            </Typography>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <div className="w-72">
                                <TextField
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    fullWidth={true}
                                    label="Email"
                                    variant="outlined"
                                />
                                <br /><br />
                                <TextField
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    fullWidth={true}
                                    label="Password"
                                    variant="outlined"
                                    type={"password"}
                                />
                                <br /><br />

                                <Button
                                    className='bg-blue-500'
                                    size={"large"}
                                    variant="contained"
                                    onClick={async () => {
                                        const response = await axios.post(`${BASE_URL}/api/admin/login`, {}, {
                                            headers: {
                                                username: email,
                                                password
                                            }
                                        })
                                        let data = response.data;
                                        setUser({ userEmail: email, isLoading: false });
                                        Cookies.set('token', data.token);
                                        navigate.push("/courses")
                                    }}

                                > Signin</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )

}

export default Signin;