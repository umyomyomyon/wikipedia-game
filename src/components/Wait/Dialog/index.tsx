import React from "react";

// mui
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";

// components
import { DialogBase } from "../../general/DialogBase";
import { UserList, dummyUserList } from "../../general/UserList";
import { TargetArticle } from "./TargetArticle";

const TargetContainer = styled(Stack)({
  width: "90%",
  marginLeft: "10%",
});

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

interface CreateRoomDialogProps {
  open: boolean;
}

export const WaitDialog: React.FC<CreateRoomDialogProps> = ({
  open,
}): JSX.Element => {
  const roomId = 38924;
  const startTarget = "対消滅";
  const goalTarget = undefined;

  return (
    <DialogBase
      open={open}
      title="みんなで"
      dialogActions={
        <DialogActions
          sx={{
            justifyContent: "space-between",
            paddingRight: 3,
            paddingLeft: 3,
          }}
        >
          <StyledTypography color="primary">ROOM ID: {roomId}</StyledTypography>
        </DialogActions>
      }
    >
      <TargetContainer spacing={3}>
        <Stack alignItems="center" spacing={3}>
          <TargetArticle target={startTarget} startOrGoal="start" />
          <TargetArticle target={goalTarget} startOrGoal="goal" />
        </Stack>
      </TargetContainer>
      <UserList users={dummyUserList} />
    </DialogBase>
  );
};
