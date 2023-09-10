import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config"
function AddCourse() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<number>(0)

    return <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}>
                <TextField
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                    required
                />

                <TextField
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                    required
                />

                <TextField
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                    required
                />

                <TextField
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        const price = parseFloat(e.target.value);
                        setPrice(price)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                    required
                />

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async () => {
                        await axios.post(`${BASE_URL}/admin/courses`, {
                            title: title,
                            description: description,
                            imageLink: image,
                            published: true,
                            price
                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert("Added course!");
                    }}
                > Add course</Button>
            </Card>
        </div>
    </div>
}

export default AddCourse;