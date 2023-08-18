import { Box, CardActionArea, Paper, Stack, Typography } from "@mui/material";
import { StyledSection } from "ui/StyledSection";
import { Course } from "../store/atoms/course";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/user";
import { stringToColor } from "ui";
import { useRouter } from "next/navigation";

export function UpcomingEvents({
  title,
}: // comingSoonCourses,
{
  title: string;
  // comingSoonCourses: Course[];
}) {
  const router = useRouter();
  const { user } = useRecoilValue(userState); //todo add selector
  return (
    <StyledSection sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" marginBottom={4}>
        {title}
      </Typography>
      <Box flexGrow={1} overflow={"overlay"}>
        <Stack width={"100%"} spacing={2}>
          {user?.purchasedCourses.map((course, index) => (
            <Paper
              key={course.title + index}
              sx={{
                ...(course.imageLink
                  ? {
                      backgroundImage: `url(${course.imageLink})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }
                  : {}),
                borderRadius: "10px",
                backgroundColor: stringToColor(course.title),
                // marginRight: 2,
              }}
            >
              <CardActionArea
                sx={{
                  ...(course.imageLink
                    ? { background: "rgba(255,255,255,0.3)" }
                    : {}),
                  padding: "10px",
                }}
                onClick={() => router.push(`/courses/${course._id}`)}
              >
                {course.title}
              </CardActionArea>
            </Paper>
          ))}
        </Stack>
      </Box>
    </StyledSection>
  );
}
