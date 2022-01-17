import React, { useState } from "react";

// mui
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// icons
import SurrenderIcon from "@mui/icons-material/Flag";

interface SurrenderButtonProps {
  handleSurrender: () => void;
}

export const SurrenderButton: React.FC<SurrenderButtonProps> = ({
  handleSurrender,
}) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  return (
    <Button
      color="secondary"
      variant="contained"
      sx={{ width: 120, height: 35, marginTop: 2 }}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={handleSurrender}
    >
      {isMouseOver ? (
        <Typography fontWeight="bold" fontSize={14}>
          あきらめる
        </Typography>
      ) : (
        <SurrenderIcon />
      )}
    </Button>
  );
};
