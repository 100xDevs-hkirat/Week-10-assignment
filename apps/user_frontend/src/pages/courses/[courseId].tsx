import { AppBarComponent } from "@/components/AppBarComponent";
import { DrawerComponent } from "@/components/DrawerComponent";
import { Course, coursesState } from "@/store/atoms/course";
import { userState } from "@/store/atoms/user";
import { api } from "@/util/api";
import { ArrowBack, VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ObjectID from "bson-objectid";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Main } from "ui";

export default function CoursePage({}) {
  const router = useRouter();
  const userAtom = useRecoilValue(userState);
  const courseAtom = useRecoilValue(coursesState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const localCourse = useMemo(
    () =>
      courseAtom.courses?.find(
        (c) => c._id.toString() === router.query.courseId?.toString()
      ),
    [router.query.courseId, courseAtom.courses]
  );
  const [course, setCourse] = useState<Course | undefined>(localCourse);

  useEffect(() => {
    //check if valid objectid
    if (
      !router.query.courseId ||
      !ObjectID.isValid(router.query.courseId.toString())
    )
      return;

    setIsLoading(true);
    api
      .get(`/course/${router.query.courseId}`)
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            setCourse(response.data.course);
          } else {
            setCourse(undefined);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });

    return () => {};
  }, [router.query.courseId]);

  const handlePurchaseCourse = () => {
    setIsLoading(true);
    api
      .post(`/course/purchase/${router.query.courseId}`)
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            alert("purchase successful");

            router.push("/");
          } else {
            alert("purchase failed");
          }
        },
        (error) => {
          alert("purchase failed");
          console.log(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveCourse = () => {
    setIsLoading(true);
    api
      .post(`/course/remove/${router.query.courseId}`)
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            alert("removed successful");

            router.push("/");
          } else {
            alert("remove failed");
          }
        },
        (error) => {
          alert("remove failed");
          console.log(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isPurchased = useMemo(
    () =>
      userAtom.user?.purchasedCourses
        .map((u) => u._id)
        .includes(course?._id ?? ""),
    [userAtom.user, course]
  );

  return (
    <>
      <Box paddingX={2} paddingY={1}>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Container
        sx={{
          display: "flex",
          padding: 4,
          paddingTop: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography my={2} variant="h4">
            {course?.title ?? "Loading.."}
          </Typography>
          <Avatar
            variant="square"
            sx={{ width: "60vh", height: "60vh", objectFit: "cover" }}
            alt={course?.title}
            src={course?.imageLink}
          >
            <VideoCall />
          </Avatar>
        </Box>
        <Box flexGrow={1} display={"flex"} flexDirection={"column"} margin={4}>
          <Typography variant="subtitle1">{course?.description}</Typography>
          <Box flexGrow={1} />
          <Typography margin={2}>Price: {course?.price}</Typography>
          <Button
            disabled={isLoading}
            fullWidth
            variant="contained"
            onClick={isPurchased ? handleRemoveCourse : handlePurchaseCourse}
          >
            {isPurchased ? "Remove" : "Buy"}
          </Button>
        </Box>
      </Container>
    </>
  );
}

CoursePage.getLayout = true;
