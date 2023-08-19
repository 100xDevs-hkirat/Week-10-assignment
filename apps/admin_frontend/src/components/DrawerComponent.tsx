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

const tabs = [
  { label: "Dashboard", icon: <SpaceDashboard /> },
  { label: "Discover", icon: <TravelExplore /> },
  { label: "Calendar", icon: <EditCalendar /> },
  { label: "Community", icon: <People /> },
];

export function DrawerComponent({ open }: { open: boolean }) {
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
          {tabs.map(({ label, icon }, index) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
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
