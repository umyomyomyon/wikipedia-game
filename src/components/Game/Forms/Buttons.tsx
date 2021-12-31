import React from "react";

// mui
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

// icons
import CheckIcon from "@mui/icons-material/Check";
import BackIcon from "@mui/icons-material/ArrowUpward";

// components
import { SquareButton } from "../../general/SquareButton";

interface FormButtonsProps {
  handleClick: () => void;
  handleReturnClick: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  handleClick,
  handleReturnClick,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="決定" placement="bottom">
        <SquareButton color="primary" variant="contained" onClick={handleClick}>
          <CheckIcon />
        </SquareButton>
      </Tooltip>
      <Tooltip title="戻る" placement="bottom">
        <SquareButton
          color="secondary"
          variant="contained"
          onClick={handleReturnClick}
        >
          <BackIcon />
        </SquareButton>
      </Tooltip>
    </Stack>
  );
};
