import { Box, Paper, Stack, Typography } from "@mui/material";
import { StyledSection } from "ui/StyledSection";
import { Course } from "../store/atoms/course";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/user";
import { stringToColor } from "ui";

export function UpcomingEvents({
  title,
}: // comingSoonCourses,
{
  title: string;
  // comingSoonCourses: Course[];
}) {
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
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: stringToColor(course.title),
                // marginRight: 2,
              }}
            >
              {course.title}
            </Paper>
          ))}
        </Stack>
      </Box>
    </StyledSection>
  );
}
