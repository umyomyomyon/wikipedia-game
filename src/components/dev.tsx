import React from "react";
import { useRecoilState } from "recoil";

// mui
import Button from "@mui/material/Button";

// atoms
import { mode as modeAtom } from "../recoil/atoms/mode";

export const ModeChangeButton: React.FC = (): JSX.Element => {
  const [mode, setMode] = useRecoilState(modeAtom);

  const handleClick = () => {
    const nextMode = mode === "top" ? "game" : "top";
    setMode(nextMode);
  };

  return (
    <Button color="primary" variant="contained" onClick={handleClick}>
      mode change
    </Button>
  );
};
