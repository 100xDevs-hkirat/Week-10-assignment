import { Paper, styled } from "@mui/material";

export const StyledSection = styled(Paper)(({ theme }) => ({
  width: "100%",
  flexGrow: 1,
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: "18px",
  padding: theme.spacing(4),
}));
