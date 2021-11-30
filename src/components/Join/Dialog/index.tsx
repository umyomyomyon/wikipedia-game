import React from "react";

// mui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { DialogBase } from "../../general/DialogBase";

interface JoinDialogProps {
  open: boolean;
  handleClose: () => void;
}

export const JoinDialog: React.FC<JoinDialogProps> = ({
  open,
  handleClose,
}): JSX.Element => {
  return (
    <DialogBase
      open={open}
      onClose={handleClose}
      title="参加する"
      contentSx={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          ROOM ID
        </Typography>
        <TextField />
        <Button variant="contained">JOIN</Button>
      </Stack>
    </DialogBase>
  );
};
