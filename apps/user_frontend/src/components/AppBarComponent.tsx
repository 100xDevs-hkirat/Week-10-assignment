import { LinearScale, TuneRounded } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms/user";

export function AppBarComponent({
  title,
  open,
  setOpen,
}: {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const setUserAtom = useSetRecoilState(userState);

  const { push } = useRouter();

  const openMenu = Boolean(anchorEl);

  const handleLogout = () => {
    //clear cookie
    Cookies.remove("token", { path: "/" });

    setUserAtom({ user: null, isLoading: false });

    //close menu
    handleClose();

    //redirect to login page
    push("/signIn");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: 0 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={() => setOpen(!open)} color="inherit">
          <LinearScale />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleClick} color="inherit">
          <TuneRounded />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
