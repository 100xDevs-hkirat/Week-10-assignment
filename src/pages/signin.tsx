import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
// import {useNavigate} from "react-router-dom";
import {useRouter} from 'next/router';
import {useSetRecoilState} from "recoil";
import {userState} from "@/store/atoms/user";
import ts from 'typescript';

function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router=useRouter();
    const setUser = useSetRecoilState(userState);

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card variant={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        try{
                            const res = await axios.post('/api/signin', {
                                username: email,
                                password: password
                            }, {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            });
                            const data = res.data;
    
                            localStorage.setItem("token", data.token);
                            // window.location = "/"
                            setUser({
                                // @ts-ignore
                                userEmail: email,
                                isLoading: false
                            })
                            router.push('/courses');
                        }catch(err){
                            alert("error occured")
                        }
                    }}

                > Signin</Button>
            </Card>
        </div>
    </div>
}

export default Signin;