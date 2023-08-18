import { AppBarComponent } from "@/components/AppBarComponent";
import { DrawerComponent } from "@/components/DrawerComponent";
import { Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Main } from "ui";

export default function Layout({ children }: { children: React.JSX.Element }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AppBarComponent title="EdKart" open={open} setOpen={setOpen} />
      <DrawerComponent open={open} />
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </>
  );
}
