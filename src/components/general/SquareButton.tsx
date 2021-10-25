import React from "react";

//mui
import { styled } from "@mui/material";
import Button, { ButtonProps } from "@mui/material/Button";

export const SquareButton = styled<React.FC<ButtonProps>>(Button)({
  height: 40,
  minWidth: 40,
  padding: 0,
});
