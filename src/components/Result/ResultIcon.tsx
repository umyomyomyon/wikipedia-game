import React from "react";

// icons
import WinnerIcon from "@mui/icons-material/EmojiEvents";
import SurrenderIcon from "@mui/icons-material/Close";

interface ResultIconProps {
  isWinner: boolean;
  isSurrendered: boolean;
}

export const ResultIcon: React.FC<ResultIconProps> = ({
  isWinner,
  isSurrendered,
}) => {
  return (
    <React.Fragment>
      {isWinner && (
        <WinnerIcon color="primary" sx={{ width: 30, height: 30 }} />
      )}
      {isSurrendered && (
        <SurrenderIcon color="secondary" sx={{ width: 30, height: 30 }} />
      )}
    </React.Fragment>
  );
};
