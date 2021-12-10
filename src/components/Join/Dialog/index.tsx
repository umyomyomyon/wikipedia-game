import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// mui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// components
import { DialogBase } from "../../general/DialogBase";

// atoms
import {
  userName as userNameAtom,
  userUuid as userUuidAtom,
} from "../../../recoil/atoms/user";

import { joinRoom } from "../../../utils/room";
import { validateRoomId } from "../../../utils/validations";

interface JoinDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const JoinDialog: React.FC<JoinDialogProps> = ({
  open,
  handleClose,
}): JSX.Element => {
  const [roomId, setRoomId] = useState<number | undefined>(undefined);
  const [roomIdError, setRoomIdError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const userName = useRecoilValue(userNameAtom);
  const userUuid = useRecoilValue(userUuidAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(Number(e.currentTarget.value));
  };

  const handleClick = () => {
    if (!roomId) return;
    if (!userUuid) return;
    const isValidRoomId = validateRoomId(roomId);
    if (!isValidRoomId) {
      setRoomIdError(true);
      return;
    }

    try {
      setIsFetching(true);
      joinRoom(roomId, userUuid, userName);
    } catch {
      // バックエンドとの通信が失敗した場合の処理
      console.error("error in handleClick at JoinDialog.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <DialogBase
      open={open}
      onClose={handleClose}
      title="参加する"
      contentSx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <Typography color="primary" sx={{ fontWeight: "bold" }}>
              ROOM ID
            </Typography>
            <TextField
              placeholder="ルームIDを入力"
              onChange={handleChange}
              error={roomIdError}
              onFocus={() => setRoomIdError(false)}
            />
            <Button variant="contained" onClick={handleClick}>
              JOIN
            </Button>
          </React.Fragment>
        )}
      </Stack>
      {roomIdError && (
        <Typography color="secondary" variant="caption">
          ※ルームIDが正しくありません
        </Typography>
      )}
    </DialogBase>
  );
};
