import { Box, Stack } from "@mui/material";
import { ImgLoader } from "../assets/img";


function Loader({ pulse = false, position = "fixed" }) {
  return (
    <Stack height={position === "fixed" ? "100vh" : "auto"} alignItems="center" justifyContent="center">
      <Box
        position="relative"
        width={64}
        height={64}
        sx={
          pulse
            ? {
                animation: "pulse-loader 2s ease infinite",
                "@keyframes pulse-loader": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }
            : {}
        }
      >
        <img src={ImgLoader} alt="loader" width="100%" height="100%" />
        <Box
          position="absolute"
          width={16}
          height={16}
          bgcolor="primary.main"
          borderRadius={2}
          sx={{
            animation: "rotate-loader 1.5s ease infinite",
            "@keyframes rotate-loader": {
              "0%": { bottom: 12, left: -8 },
              "33%": { bottom: 64, left: 24 },
              "66%": { bottom: 12, left: 56 },
              "100%": { bottom: 12, left: -8 },
            },
          }}
        />
      </Box>
    </Stack>
  );
}

export default Loader;
