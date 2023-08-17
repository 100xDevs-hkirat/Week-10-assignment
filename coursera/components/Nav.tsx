import { userState } from '@/store/atoms/user';
import { isUserLoading } from '@/store/selector/isUserLoading';
import { userEmailState } from '@/store/selector/userEmail';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const Nav: React.FC = () => {
    const navigate = useRouter();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if (userLoading) {
        return <></>
    }

    if (userEmail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate.push("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10, display: "flex"}}>
                <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                navigate.push("/addcourse")
                            }}
                        >Add course</Button>
                    </div>

                    <div style={{marginRight: 10}}>
                        <Button
                            onClick={() => {
                                navigate.push("/courses")
                            }}
                        >Courses</Button>
                    </div>

                    <Button
                        className='bg-blue-500'
                        variant={"contained"}
                        onClick={() => {
                            // localStorage.setItem("token", null);
                            setUser({
                                isLoading: false,
                                userEmail: ''
                            })
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate.push("/")
            }}>
                <Typography variant={"h6"}>Coursera</Typography>
            </div>
    
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button
                    className='bg-blue-500'
                        variant={"contained"}
                        onClick={() => {
                            navigate.push("/signup")
                        }}
                    >Signup</Button>
                </div>
                <div>
                    <Button
                    className='bg-blue-500'
                        variant={"contained"}
                        onClick={() => {
                            navigate.push("/signin")
                        }}
                    >Signin</Button>
                </div>
            </div>
        </div>
    }
}
