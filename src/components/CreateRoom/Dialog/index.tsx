import React, { useState } from "react";
// mui
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

// components
import { DialogBase } from "../../general/DialogBase";
import { StartGoalSettings } from "../StartGoalSettings";
import { UserList } from "../../general/UserList";

import { useCreateRoom, useRoomUsers } from "../../../hooks/firebase";

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

interface CreateRoomDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateRoomDialog: React.FC<CreateRoomDialogProps> = ({
  open,
  handleClose,
}): JSX.Element => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const roomId = useCreateRoom(open);
  const users = useRoomUsers(roomId);

  const wrappedHandleClose = () => {
    handleClose();
  };

  return (
    <DialogBase
      open={open}
      onClose={wrappedHandleClose}
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
          <Button variant="contained" disabled={!isReady}>
            <StyledTypography>START</StyledTypography>
          </Button>
        </DialogActions>
      }
    >
      <StartGoalSettings />
      <UserList users={users} />
    </DialogBase>
  );
};
