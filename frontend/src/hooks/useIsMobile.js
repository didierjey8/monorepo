import React from "react";
import { useMediaQuery } from "@mui/material";
import Theme from "../theme";

function useIsMobile() {
  const isMobile = useMediaQuery(Theme.breakpoints.down("md"), { noSsr: true });

  return isMobile;
}

export default useIsMobile;
