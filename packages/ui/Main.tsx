import { styled } from "@mui/material";
import { drawerWidth } from "./constants";

// const drawerWidth = 210;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  borderRadius: "22px 0 0 0",
  // height: 0,
  backgroundColor: theme.palette.background.paper, //mode==='light' ? '#0351' : '#0143',
  flex: 1,
  // paddingBlock: theme.spacing(5),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px`,
    [theme.breakpoints.down("sm")]: { marginLeft: 0 },
  }),
}));
