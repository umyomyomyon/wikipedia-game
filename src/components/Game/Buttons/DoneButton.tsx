import React from "react";

// mui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface DoneButtonProps {
  disabled: boolean;
  isDone: boolean;
  handleDone: () => void;
  handleCancel: () => void;
}

export const DoneButton: React.FC<DoneButtonProps> = ({
  disabled,
  isDone,
  handleDone,
  handleCancel,
}) => {
  return (
    <React.Fragment>
      {isDone ? (
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          disabled={disabled}
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
          <Typography sx={{ fontWeight: "bold" }}>CANCEL</Typography>
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
