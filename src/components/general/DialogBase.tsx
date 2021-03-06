import React from "react";

// mui
import { SxProps } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";

interface DialogBaseProps {
  open: boolean;
  title: string;
  onClose?: () => void;
  dialogActions?: JSX.Element;
  contentSx?: SxProps;
  disableEscapeKeyDown?: boolean;
}

export const DialogBase: React.FC<DialogBaseProps> = ({
  children,
  open,
  title,
  onClose,
  dialogActions,
  contentSx,
  disableEscapeKeyDown,
}): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { backgroundColor: "#e0e9f0", width: "80%" } }}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <DialogTitle color="primary" sx={{ fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={contentSx}>{children}</DialogContent>
      {dialogActions && <Divider />}
      {dialogActions}
    </Dialog>
  );
};
