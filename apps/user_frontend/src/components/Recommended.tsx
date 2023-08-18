import { Box, Paper, Stack, Typography } from "@mui/material";
import { StyledSection } from "ui/StyledSection";
import { Course } from "../store/atoms/course";
import { stringToColor } from "ui";

export function Recommended({
  title,
  RecommendedCourses,
}: {
  title: string;
  RecommendedCourses: Course[];
}) {
  return (
    <StyledSection sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" marginBottom={4}>
        {title}
      </Typography>
      <Box display={"flex"} flexGrow={1} overflow={"overlay"}>
        <Stack direction={"row"} spacing={2}>
          {RecommendedCourses.map((course, index) => (
            <Paper
              key={course.title + index}
              sx={{
                width: "25vh",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: stringToColor(course.title),
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
