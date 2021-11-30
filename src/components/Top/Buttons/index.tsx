import React from "react";

// mui
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const StyledButton = styled(Button)({
  height: 40,
  width: 144,
});

interface TopPageButtonProps {
  handleClickCreateRoomDialogOpen: () => void;
  handleClickJoinDialogOpen: () => void;
  handleClickWaitDialogOpen: () => void;
}

export const TopPageButtons: React.FC<TopPageButtonProps> = ({
  handleClickCreateRoomDialogOpen,
  handleClickJoinDialogOpen,
  handleClickWaitDialogOpen,
}): JSX.Element => {
  return (
    <Stack direction="column" spacing={2}>
      <StyledButton
        variant="contained"
        onClick={handleClickCreateRoomDialogOpen}
      >
        １人で始める
      </StyledButton>
      <StyledButton
        variant="contained"
        onClick={handleClickCreateRoomDialogOpen}
      >
        部屋を作る
      </StyledButton>
      <StyledButton variant="contained" onClick={handleClickJoinDialogOpen}>
        参加する
      </StyledButton>
    </Stack>
  );
};
