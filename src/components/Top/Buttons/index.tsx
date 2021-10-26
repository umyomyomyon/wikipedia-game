import React from "react";

// mui
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)({
  height: 40,
  width: 144,
});

export const TopPageButtons: React.FC = (): JSX.Element => {
  return (
    <Stack direction="column" spacing={2}>
      <StyledButton variant="contained">１人で始める</StyledButton>
      <StyledButton variant="contained">部屋を作る</StyledButton>
      <StyledButton variant="contained">参加する</StyledButton>
    </Stack>
  );
};
