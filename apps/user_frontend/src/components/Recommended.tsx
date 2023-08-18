import { Box, CardActionArea, Paper, Stack, Typography } from "@mui/material";
import { StyledSection } from "ui/StyledSection";
import { Course } from "../store/atoms/course";
import { stringToColor } from "ui";
import { useRouter } from "next/navigation";

export function Recommended({
  title,
  RecommendedCourses,
}: {
  title: string;
  RecommendedCourses: Course[];
}) {
  const router = useRouter();
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
                ...(course.imageLink
                  ? {
                      backgroundImage: `url(${course.imageLink})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }
                  : {}),
                width: "25vh",
                borderRadius: "10px",
                backgroundColor: stringToColor(course.title),
              }}
            >
              <CardActionArea
                sx={{
                  ...(course?.imageLink
                    ? { background: "rgba(255,255,255,0.2)" }
                    : {}),
                  padding: "10px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "start",
                }}
                onClick={() => router.push(`/courses/${course._id}`)}
              >
                <Typography>{course.title}</Typography>
                <br />
                <Typography variant="subtitle1">
                  {course.description}
                </Typography>
                <br />
                <Box flexGrow={1} />
                <Typography variant="subtitle1">
                  Price: {course.price}
                </Typography>
              </CardActionArea>
            </Paper>
          ))}
        </Stack>
      </Box>
    </StyledSection>
  );
}
