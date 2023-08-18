import { Box, Button, Typography } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";

export function WelcomeBar() {
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
