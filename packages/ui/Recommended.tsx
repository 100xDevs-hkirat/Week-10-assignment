import { Box, Paper, Stack, Typography } from "@mui/material";
import { StyledSection } from "./StyledSection";
import { Course } from "../../apps/user_frontend/src/store/atoms/course";

export function stringToColor(inputString: string) {
  let hash = 0;

  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + (hash << 5) - hash;
  }

  const hue = Math.abs(hash) % 360; // Use the hash as the hue value
  const saturation = 50; // Adjust saturation as needed
  const lightness = 50; // Adjust lightness as needed

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

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
