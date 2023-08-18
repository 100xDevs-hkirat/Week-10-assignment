import { AppBarComponent } from "@/components/AppBarComponent";
import { DrawerComponent } from "@/components/DrawerComponent";
import { Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Main } from "ui";

export default function CoursePage({}) {
  const router = useRouter();
  return <>Post: {router.query.courseId}</>;
}

CoursePage.getLayout = true;
