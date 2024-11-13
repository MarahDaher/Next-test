import { CircularProgress, Stack, Typography } from "@mui/material";

export default function LoadingImages() {
  return (
    <Stack alignItems="center" py={4}>
      <CircularProgress />
      <Typography variant="body2" mt={2}>
        Loading images...
      </Typography>
    </Stack>
  );
}
