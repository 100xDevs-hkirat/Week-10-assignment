import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/atoms/user";

function Signin() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState("");

    const router = useRouter();
    const setUser = useSetRecoilState(userState);

    return <div>
        <div style={{
            paddingTop: 150,
            marginBottom: 10,
            display: "flex",
            justifyContent: "center"
        }}>
            <Typography variant={"h6"}>
                Welcome to Coursera. Sign in below
            </Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
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
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                       
                        const res = await axios.post('/api/admin/signin', null, {
                            headers: {
                                "Content-type": "application/json",
                                "username":email, 
                                password
                            }
                        });
                        const data = res.data;
                        
                        // window.location = "/"
                        setUser({
                            userEmail: email,
                            isLoading: false
                        })
                        router.push("/courses")
                    }}

                > Signin</Button>
            </Card>
        </div>
    </div>
}

export default Signin;