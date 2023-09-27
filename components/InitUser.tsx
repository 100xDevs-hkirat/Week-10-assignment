import {
    useSetRecoilState
} from 'recoil';
import axios from "axios";
import { userState } from "../store/atoms/user";
import {useEffect} from "react";

export default function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get('/api/admin/me', {
               
            })
            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: ""
                })
            }
        } catch (e) {
            setUser({
                isLoading: false,
                userEmail: ""
            })
        }
    };

    useEffect(() => {
        init();
    }, []);

    return <></>
}