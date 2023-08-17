import { userState } from '@/store/atoms/user';
import { isUserLoading } from '@/store/selector/isUserLoading';
import { userEmailState } from '@/store/selector/userEmail';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
import axios from 'axios';

export const Nav: React.FC = () => {
    const navigate = useRouter();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);
 

    if (userEmail) {
        return <div className='sticky top-0 bg-white opacity-90 py-2' style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1
        }}>
            <div  style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
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
                            Cookies.remove('token');
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
        const cookies = context.req.headers.cookie;
        const parsedCookie = cookie.parse(cookies || '');
        const token = parsedCookie.jwtToken;

        try {
            const response = await axios.get('/api/user', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        
            if (!response.data.isAuthorized) {
              return {
                redirect: {
                  destination: '/unauthorized', // Redirect to an unauthorized page
                  permanent: false,
                },
              };
            }
        
            return {
              props: {}, // User is authorized, continue rendering the protected page
            };
          } catch (error) {
            return {
              redirect: {
                destination: '/login', // Redirect to login page on error or unauthorized access
                permanent: false,
              },
            };
          }
}
