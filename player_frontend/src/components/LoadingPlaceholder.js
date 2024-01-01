import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Variants() {
  const isSmallScreen = useMediaQuery("(max-width:818px)");

  return (
    <Stack spacing={1}>
      <Skeleton
        variant="rounded"
        width={isSmallScreen ? 350 : 690}
        height={60}
        animation="wave"
      />
      <Skeleton
        variant="rounded"
        width={isSmallScreen ? 350 : 690}
        height={60}
        animation="wave"
      />
      <Skeleton
        variant="rounded"
        width={isSmallScreen ? 350 : 690}
        height={60}
        animation="wave"
      />
    </Stack>
  );
}
