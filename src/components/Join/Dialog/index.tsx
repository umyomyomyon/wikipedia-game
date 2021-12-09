import React, { useState } from "react";

// mui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// components
import { DialogBase } from "../../general/DialogBase";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(Number(e.currentTarget.value));
  };

  const handleClick = () => {
    if (!roomId) return;
    const isValidRoomId = validateRoomId(roomId);
    if (!isValidRoomId) {
      setRoomIdError(true);
      return;
    }

    try {
      setIsFetching(true);
      // バックエンドと通信してルームに参加する処理
    } catch {
      // バックエンドとの通信が失敗した場合の処理
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
