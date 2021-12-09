import React from "react";

// mui
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

const StyledButton = styled(Button)({
  height: 40,
  width: 144,
});

interface TopPageButtonProps {
  enable: boolean;
  handleClickCreateRoomDialogOpen: () => void;
  handleClickJoinDialogOpen: () => void;
  handleClickWaitDialogOpen: () => void;
}

export const TopPageButtons: React.FC<TopPageButtonProps> = ({
  enable,
  handleClickCreateRoomDialogOpen,
  handleClickJoinDialogOpen,
  handleClickWaitDialogOpen,
}): JSX.Element => {
  return (
    <Collapse in={enable}>
      <Stack direction="column" spacing={2}>
        <StyledButton
          variant="contained"
          onClick={handleClickCreateRoomDialogOpen}
          disabled={!enable}
        >
          １人で始める
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleClickCreateRoomDialogOpen}
          disabled={!enable}
        >
          部屋を作る
        </StyledButton>
        <StyledButton
          variant="contained"
          onClick={handleClickJoinDialogOpen}
          disabled={!enable}
        >
          参加する
        </StyledButton>
      </Stack>
    </Collapse>
  );
};
