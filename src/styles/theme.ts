import { createTheme } from "@mui/material/styles";

import { COLORS } from "../conf";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
});

export default theme;
