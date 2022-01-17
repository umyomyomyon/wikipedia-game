import React from "react";

// mui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface DoneButtonProps {
  disabled: boolean;
  isDone: boolean;
  isSurrendered: boolean;
  handleDone: () => void;
  handleCancel: () => void;
}

export const DoneButton: React.FC<DoneButtonProps> = ({
  disabled,
  isDone,
  isSurrendered,
  handleDone,
  handleCancel,
}) => {
  const cancelText = isSurrendered ? "やっぱりあきらめない" : "CANCEL";
  return (
    <React.Fragment>
      {isDone || isSurrendered ? (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          onClick={handleCancel}
          sx={{
            position: "absolute",
            maxWidth: 300,
            left: 0,
            right: 0,
            bottom: 20,
            margin: "auto",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{cancelText}</Typography>
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          fullWidth
          disabled={disabled}
          onClick={handleDone}
          sx={{
            position: "absolute",
            maxWidth: 300,
            left: 0,
            right: 0,
            bottom: 20,
            margin: "auto",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>DONE</Typography>
        </Button>
      )}
    </React.Fragment>
  );
};
