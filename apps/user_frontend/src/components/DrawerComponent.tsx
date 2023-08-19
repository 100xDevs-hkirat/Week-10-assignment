import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import React from "react";
import { drawerWidth } from "ui";
import {
  EditCalendar,
  People,
  SpaceDashboard,
  TravelExplore,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const tabs = [
  { label: "Dashboard", icon: <SpaceDashboard />, route: "/" },
  { label: "Discover", icon: <TravelExplore />, route: "/courses" },
  { label: "Calendar", icon: <EditCalendar />, route: "/calendar" },
  { label: "Community", icon: <People />, route: "/community" },
];

export function DrawerComponent({ open }: { open: boolean }) {
  const { push } = useRouter();
  return (
    <SwipeableDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={() => {}}
      onOpen={() => {}}
    >
      <Toolbar />
      <Box>
        <List>
          {tabs.map(({ label, icon, route }, index) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => push(route)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
