import { Course, coursesState } from "@/store/atoms/course";
import { api } from "@/util/api";
import { ArrowBack, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

type Props = {};

const CourseCard = ({ course }: { course: Course }) => {
  const { push } = useRouter();
  return (
    <Card
      onClick={() => push(`/courses/${course._id}`)}
      sx={{
        height: "100%",
        bgcolor: "inherit",
        paddingY: { xs: 1, sm: 4, md: 6 },
        paddingX: 2,
      }}
      variant="outlined"
    >
      <Avatar
        sx={{ objectFit: "contain", height: "240px", width: "100%" }}
        variant="square"
        alt={course.title}
        src={course.imageLink}
      >
        <VideoCall />
      </Avatar>
      <CardContent
        sx={{
          textAlign: "center",
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          },
        }}
      >
        <Typography gutterBottom variant="body1" component="h2">
          {course.title}
        </Typography>
        <Typography variant="body2" mb={2}>
          by <b>{course?.description}</b>
        </Typography>
        <Typography variant="body2" color="#B12704">
          Price: Rs{course.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Courses({}: Props) {
  const [coursesAtom, setCoursesAtom] = useRecoilState(coursesState);
  const router = useRouter();

  useEffect(() => {
    api
      .get("/course")
      .then(
        (res) => {
          if (res.status === 200)
            setCoursesAtom({ isLoading: false, courses: res.data.courses });
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <Container>
      <Box paddingX={1} paddingY={1} alignItems={"center"} display={"flex"}>
        {/* <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton> */}
        <Typography variant="h4" margin={2}>
          All Courses
        </Typography>{" "}
      </Box>
      <Grid padding={2} container>
        {coursesAtom.courses?.map((course, index) => (
          <Grid
            key={course.title + index}
            // ref={Books.length - 4 === index ? lastBookElementRef : undefined}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

Courses.getLayout = true;
