import {
  Avatar,
  Box,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { StyledSection } from "./StyledSection";
import { grey } from "@mui/material/colors";
import { Check } from "@mui/icons-material";
import { stringToColor } from "./Recommended";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

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
