import { AppBarComponent } from "@/components/AppBarComponent";
import { DrawerComponent } from "@/components/DrawerComponent";
import { Course } from "@/store/atoms/course";
import { userState } from "@/store/atoms/user";
import { api } from "@/util/api";
import { VideoCall } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
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
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <Container sx={{ display: "flex", padding: 4 }}>
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
  );
}

CoursePage.getLayout = true;
