import { BASE_URL } from "@/config";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import cookie from 'cookie';
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";
import { useEffect } from "react";

const InitUser: React.FC<{ username: string }> = ({ username }) => {
    const setUser = useSetRecoilState(userState);

    useEffect(() => {
        if (username) {
            setUser({
                isLoading: false,
                userEmail: username
            });
        }
    })

    return <></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = context.req.headers.cookie;
        const parsedCookie = cookie.parse(cookies || '');
        const token = parsedCookie.jwtToken;

        const response = await axios.get(`${BASE_URL}/api/admin/me`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if (!response.data.isAuth) {
            return {
                redirect: {
                    destination: '/signup' || '/signin', // Redirect to an unauthorized page
                    permanent: false,
                },
            };
        }

        return {
            props: {
                username: response.data.username
            }
        }

    } catch (error) {
        return {
            redirect: {
                destination: '/signin' || 'signup', // Redirect to login page on error or unauthorized access
                permanent: false,
            },
        };

    }
}

export default InitUser;