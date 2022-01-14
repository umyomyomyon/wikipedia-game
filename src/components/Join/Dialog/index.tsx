import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
import { roomId as roomIdAtom } from "../../../recoil/atoms/room";

import { joinRoom } from "../../../utils/room";
import { validateRoomId } from "../../../utils/validations";

interface JoinDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOpenWaitDialog: () => void;
}

export const JoinDialog: React.FC<JoinDialogProps> = ({
  open,
  handleClose,
  handleOpenWaitDialog,
}): JSX.Element => {
  const setRoomId = useSetRecoilState(roomIdAtom);
  const [roomIdBuffer, setRoomIdBuffer] = useState<number | undefined>(
    undefined
  );
  const [roomIdError, setRoomIdError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const userName = useRecoilValue(userNameAtom);
  const userUuid = useRecoilValue(userUuidAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomIdBuffer(Number(e.currentTarget.value));
  };

  const handleClick = () => {
    if (!roomIdBuffer) return;
    if (!userUuid) return;
    const isValidRoomId = validateRoomId(roomIdBuffer);
    if (!isValidRoomId) {
      setRoomIdError(true);
      return;
    }

    try {
      setIsFetching(true);
      joinRoom(roomIdBuffer, userUuid, userName).then((result) => {
        if (result) {
          setRoomId(result);
          handleOpenWaitDialog();
          handleClose();
        }
      });
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
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={!roomIdBuffer}
            >
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
