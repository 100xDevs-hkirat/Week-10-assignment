import { Main } from "ui";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { api } from "@/util/api";
import { useRecoilState } from "recoil";
import { Course, coursesState } from "@/store/atoms/course";
// import { UpcomingEvents } from "./UpcomingEvents";
// import { UserProgress } from "./UserProgress";
// import { Recommended } from "./Recommended";
import { WelcomeBar } from "./WelcomeBar";
import { useForm } from "react-hook-form";
import { api } from "@/util/api";
import { error } from "console";

const steps = ["Purchased course", "completionPercent", "Certified"];

type Props = {};

export default function Dashboard({}: Props) {
  // const [course, setCourse] = useRecoilState(coursesState);
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Course>({
    defaultValues: {
      title: "",
      description: "",
      imageLink: "",
      price: "",
    },
  });

  const onSubmit = (data: Course) => {
    console.log(data);

    setIsLoading(true);
    //Call backend to create course
    api
      .post("/course/", data)
      .then(
        (res) => {
          if (res.status === 200) {
            console.log(res);
            alert("Successfully created course");
            reset();
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => setIsLoading(false));

    // reset();
  };

  return (
    <>
      <Container>
        <WelcomeBar />
        <Card
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ borderRadius: 5, marginY: 4, padding: 2 }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Create a course
            </Typography>
            {/* <br /> */}
            <TextField
              error={Boolean(errors?.title)}
              helperText={errors?.title?.type}
              {...register("title", { required: true, maxLength: 20 })}
              type="text"
              size="small"
              margin="normal"
              fullWidth
              id="Title-basic"
              label="Title"
              variant="standard"
            />
            <TextField
              error={Boolean(errors?.description)}
              helperText={errors?.description?.type}
              {...register("description", { required: true, maxLength: 20 })}
              type="text"
              size="small"
              margin="normal"
              fullWidth
              id="Title-basic"
              label="Description"
              variant="standard"
            />
            <TextField
              error={Boolean(errors?.imageLink)}
              helperText={errors?.imageLink?.type}
              {...register("imageLink", { required: true, maxLength: 200 })}
              type="url"
              size="small"
              margin="normal"
              fullWidth
              id="Title-basic"
              label="Image Link"
              variant="standard"
            />
            <TextField
              error={Boolean(errors?.price)}
              helperText={errors?.price?.type}
              {...register("price", { required: true, maxLength: 20 })}
              type="number"
              size="small"
              margin="normal"
              fullWidth
              id="Title-basic"
              label="Price"
              variant="standard"
            />
          </CardContent>
          <br />
          <CardActions sx={{ direction: "rtl" }}>
            <Button disabled={isLoading} type="submit" variant="contained">
              Create
            </Button>
            <Button
              disabled={isLoading}
              color="secondary"
              variant="contained"
              onClick={() =>
                reset({
                  title: "",
                  description: "",
                  imageLink: "",
                  price: "",
                })
              }
              sx={{ mx: 3 }}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
