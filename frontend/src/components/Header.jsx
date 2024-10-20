import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Link,
  Toolbar,
} from "@mui/material";
import { ImgBrandDark } from "../assets/img";
import Theme from "../theme";
import TranslationSwitch from "./translationSwitch";

function Header() {
  return (
    <>
      <AppBar position="static" elevation={1} color="inherit">
        <Toolbar
          sx={{
            alignItems: "center",
            justifyContent: { xs: "space-between", md: "initial" },
            gap: 1,
            height: Theme.sizes.header.main,
          }}
        >
          <Link component={RouterLink} to="/" width={{ xs: "auto", md: Theme.sizes.sidebar.main }} height={{ xs: 18, md: 24 }}>
            <img src={ImgBrandDark} alt="Logo" height="100%" />
          </Link>
          <TranslationSwitch />
          
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
