import { styled } from "@mui/system";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeContainer = (width: number) =>
  styled("div")({
    width,
  });
