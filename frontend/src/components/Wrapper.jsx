import React from "react";
import Header from "./Header";
import { Box, Stack } from "@mui/material";
import Theme from "../theme";

function Wrapper({ bgcolor = "", children }) {
  return (
    <Box
      bgcolor={bgcolor}
      sx={{
        "& .validocus-sidebar": {
          transition: Theme.transitions.create(["transform"]),
          [Theme.breakpoints.down("md")]: {
            transform: "translateX(-100%)",
          },
        },
      }}
    >
      <Header existsSidebar={false} />
      <Stack direction="row">
        <Box
          component="main"
          marginLeft={{ xs: 0, md: `0px` }}
          width="100%"
          padding={2}
          sx={{ transition: Theme.transitions.create(["margin-left"]) }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

export default Wrapper;
