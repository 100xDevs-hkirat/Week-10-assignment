import { Main } from "ui";
import { Box, Container, Stack, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { api } from "@/util/api";
import { useRecoilState } from "recoil";
import { coursesState } from "@/store/atoms/course";
import { UpcomingEvents } from "./UpcomingEvents";
import { UserProgress } from "./UserProgress";
import { Recommended } from "./Recommended";
import { WelcomeBar } from "./WelcomeBar";

const steps = ["Purchased course", "completionPercent", "Certified"];

type Props = {};

export default function Dashboard({}: Props) {
  const [course, setCourse] = useRecoilState(coursesState);

  //fetch courses from backend
  useEffect(() => {
    setCourse((course) => ({
      isLoading: true,
      courses: course?.courses,
    }));
    api
      .get("/course")
      .then(
        (res) => {
          console.log(res);
          setCourse({ isLoading: false, courses: res.data.courses });
        },
        (err) => {
          // alert(err);
          setCourse({ isLoading: false, courses: null });
          console.error(err);
        }
      )
      .finally(() => {
        setCourse((course) => ({ isLoading: false, courses: course.courses }));
      });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <WelcomeBar />
        <Stack direction="row" useFlexGap flexWrap="wrap">
          <Box
            display={"flex"}
            padding={2}
            width={{ xs: "100%", md: "65%" }}
            height={"69vh"}
          >
            <Recommended
              title="New courses for you"
              RecommendedCourses={
                course.courses ?? []
                // Array(5).fill({ name: "course" })
              }
            />
          </Box>
          <Box
            display={"flex"}
            padding={2}
            width={{ xs: "100%", md: "35%" }}
            height={"69vh"}
          >
            <UpcomingEvents
              title="My Courses"
              // comingSoonCourses={
              //   (user as any).purchasedCourses ?? []
              //   // Array(10).fill({ name: "course" })
              // }
            />
          </Box>
          <Box display={"flex"} padding={2} width={"100%"}>
            <UserProgress
              steps={steps}
              title="Your progress"
              userCourseProgresses={Array(1).fill({
                name: "My Course",
                progress: 75,
              })}
            />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
