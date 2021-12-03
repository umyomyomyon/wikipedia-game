import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

// mui
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

// components
import { DialogBase } from "../../general/DialogBase";
import { StartGoalSettings } from "../StartGoalSettings";
import { UserList } from "../../general/UserList";

// types
import { UserData } from "../../../types/user";

import { rtdb } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { ref, onDisconnect, onValue } from "firebase/database";
import { cloudrunUrl } from "../../../conf";

// atoms
import { userName as userNameAtom } from "../../../recoil/atoms/user";

import { createRoom, arrangeUsers } from "../../../utils/createRoom";

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
  const [roomId, setRoomId] = useState<number | undefined>(undefined);
  const [users, setUsers] = useState<UserData[]>([]);
  const userName = useRecoilValue(userNameAtom);

  useEffect(() => {
    if (!open) return;
    const auth = getAuth();
    const uid = auth.currentUser ? auth.currentUser.uid : undefined;
    if (!uid) return;

    const url = `${cloudrunUrl}/room`;
    createRoom(uid, userName, url).then((result) => {
      setRoomId(result);
    });
  }, [open]);

  useEffect(() => {
    if (!roomId) return;
    const auth = getAuth();
    const uid = auth.currentUser ? auth.currentUser.uid : undefined;
    if (!uid) return;
    const roomRef = ref(rtdb, `${roomId}/`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrangedUsers = arrangeUsers(data.users);
        setUsers(arrangedUsers);
      }
    });

    const userRef = ref(rtdb, `${roomId}/users/${uid}`);
    onDisconnect(userRef).remove();
  }, [roomId]);

  const wrappedHandleClose = () => {
    handleClose();
    setRoomId(undefined);
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
