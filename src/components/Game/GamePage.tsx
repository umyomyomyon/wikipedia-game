import * as React from "react";

// mui
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { SideMenu } from "./SideMenu";
import { Bar } from "./Bar";

const drawerWidth = 240;

export const GamePage: React.FC = ({ children }): JSX.Element => {
  return (
    <Box sx={{ display: "flex" }}>
      <Bar menuWidth={drawerWidth} />
      <SideMenu menuWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
