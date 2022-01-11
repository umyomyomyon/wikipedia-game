import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

// mui
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";

// components
import { DialogBase } from "../../general/DialogBase";
import { StartGoalSettings } from "../StartGoalSettings";
import { UserList } from "../../general/UserList";

// atoms
import { roomId as roomIdAtom } from "../../../recoil/atoms/room";
import { mode as modeAtom } from "../../../recoil/atoms/mode";
import { userUuid as userUuidAtom } from "../../../recoil/atoms/user";

import { useCreateRoom, useRoomData } from "../../../hooks/firebase";
import { startRoom } from "../../../utils/room";

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
  const roomId = useRecoilValue(roomIdAtom);
  const setMode = useSetRecoilState(modeAtom);
  const userUuid = useRecoilValue(userUuidAtom);

  useCreateRoom(open);
  const { users, host } = useRoomData(open, roomId);

  const wrappedHandleClose = () => {
    handleClose();
  };

  const handleClickStart = () => {
    if (!userUuid || !roomId) return;
    startRoom(userUuid, roomId);
    setMode("game");
    handleClose();
  };

  const handleChangeReadyState = (_isReady: boolean) => {
    setIsReady(_isReady);
  };

  return (
    <DialogBase
      open={open}
      disableEscapeKeyDown={true}
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
          <Stack direction="row" spacing={1}>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              <StyledTypography>CANCEL</StyledTypography>
            </Button>
            <Button
              variant="contained"
              onClick={handleClickStart}
              disabled={!isReady}
            >
              <StyledTypography>START</StyledTypography>
            </Button>
          </Stack>
        </DialogActions>
      }
    >
      <StartGoalSettings readyStateHandler={handleChangeReadyState} />
      <UserList users={users} host={host} />
    </DialogBase>
  );
};
