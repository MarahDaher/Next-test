import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

export default function LoadingCategories() {
  return (
    <Stack alignItems="center" py={4}>
      <CircularProgress />
      <Typography variant="body2" mt={2}>
        Loading Categories...
      </Typography>
    </Stack>
  );
}
