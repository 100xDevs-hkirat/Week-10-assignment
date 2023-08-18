import { Main, Recommended, UserProgress } from "ui";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { api } from "@/util/api";
import { useRecoilState } from "recoil";
import { coursesState } from "@/store/atoms/course";
import { CalendarToday } from "@mui/icons-material";
import { UpcomingEvents } from "./UpcomingEvents";

const steps = ["Purchased course", "completionPercent", "Certified"];

type Props = { open: boolean };

export default function Dashboard({ open }: Props) {
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
    <Main open={open}>
      <Toolbar />
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
              title="Up coming"
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
    </Main>
  );
}

function WelcomeBar() {
  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good night";
    }
  }
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      marginTop={2}
      padding={2}
    >
      <Typography variant="h4">{getGreeting()}</Typography>
      <Button startIcon={<CalendarToday />} color="inherit">
        {new Date().toLocaleString(undefined, {
          year: "numeric",
          month: "long",
        })}
      </Button>
    </Box>
  );
}
