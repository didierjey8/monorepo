import { Box, Link, Stack, Typography } from "@mui/material";
import { CONTRACT_STATUS } from "../utils/Constants";
import { Link as Routerlink } from "react-router-dom";
import Theme from "../theme";
import Flex from "../utils/Flex";

function CardContract({ id, status, title }) {

  return (
    <Link
      component={Routerlink}
      to={`/contract/${id}`}
      sx={{
        width: { xs: "100%", md: Flex.getWrapWidth(2, 8), lg: Flex.getWrapWidth(4, 8) },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        boxShadow: 2,
        borderRadius: 1,
        aspectRatio: 7 / 1,
        bgcolor: "white",
        cursor: "pointer",


        "&:hover": {
          boxShadow: 0,
          bgcolor: "action.hover",
          outlineWidth: 1,
          outlineStyle: "solid",
          outlineColor: Theme.palette.grey[400],
        },
      }}
    >

      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          flexShrink={0}
          width={24}
          height={24}
          borderRadius={0.25}
          bgcolor={
            status === CONTRACT_STATUS.closed
              ? "success.main"
              : status === CONTRACT_STATUS.open
                ? "warning.light"
                : status === CONTRACT_STATUS.draft
                  ? "grey.400"
                  : "error.main"
          }
        />
        <Stack spacing={0.5}>
          <Typography fontSize={12} fontWeight={600} lineHeight={1}>
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}

export default CardContract;
