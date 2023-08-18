import {
  Avatar,
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { QontoStepIcon, StyledSection } from "ui";
import { stringToColor } from "ui";
import { QontoConnector } from "ui";

export function UserProgress({
  title,
  userCourseProgresses,
  steps,
}: {
  title: string;
  userCourseProgresses: { name: string; progress: number }[];
  steps: string[];
}) {
  return (
    <StyledSection>
      <Typography marginBottom={4} variant="h6">
        {title}
      </Typography>
      <Box flexGrow={1} overflow={"overlay"}>
        {userCourseProgresses.map((course, index) => (
          <StyledSection
            key={course.name + index}
            sx={(theme) => ({
              marginBottom: 2,
              bgcolor: stringToColor(course.name),
              display: "flex",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
              },
              alignItems: "center",
            })}
          >
            <Box
              marginBottom={{ xs: 2, md: 0 }}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Typography marginBottom={1} variant="h6">
                {course.name}
              </Typography>
              <Avatar sx={{ color: "inherit" }} />
            </Box>
            <Stepper
              sx={{ flexGrow: 1 }}
              alternativeLabel
              activeStep={1}
              connector={<QontoConnector />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label === "completionPercent"
                      ? `${course.progress}% completed `
                      : label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </StyledSection>
        ))}
      </Box>
    </StyledSection>
  );
}
