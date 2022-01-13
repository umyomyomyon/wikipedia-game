import React from "react";

// mui
import Tooltip from "@mui/material/Tooltip";

//icons
import CheckIcon from "@mui/icons-material/Check";
// import ShuffleIcon from "@mui/icons-material/Shuffle";
import CancelIcon from "@mui/icons-material/Close";

import { SquareButton } from "../../general/SquareButton";

interface Props {
  urlTitle: string | undefined;
  handleCancelClick: () => void;
  handleDoneClick: () => void;
}

export const StartGoalSettingButtons: React.FC<Props> = ({
  urlTitle,
  handleCancelClick,
  handleDoneClick,
}): JSX.Element => {
  return (
    <React.Fragment>
      {urlTitle ? (
        <Tooltip title="キャンセル" placement="top">
          <SquareButton
            color="secondary"
            variant="contained"
            onClick={handleCancelClick}
          >
            <CancelIcon />
          </SquareButton>
        </Tooltip>
      ) : (
        <Tooltip title="決定" placement="top">
          <SquareButton
            color="primary"
            variant="contained"
            onClick={handleDoneClick}
          >
            <CheckIcon />
          </SquareButton>
        </Tooltip>
      )}
      {/* <Tooltip title="ランダム" placement="top">
        <SquareButton color="primary" variant="contained">
          <ShuffleIcon />
        </SquareButton>
      </Tooltip> */}
    </React.Fragment>
  );
};
