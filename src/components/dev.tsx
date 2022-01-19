import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// mui
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

// atoms
import { mode as modeAtom } from "../recoil/atoms/mode";
import { roomId as roomIdAtom } from "../recoil/atoms/room";

// constants
import { SCENE_MODES } from "../constants";

export const ModeChangeButton: React.FC = (): JSX.Element => {
  const [mode, setMode] = useRecoilState(modeAtom);

  const handleClick = () => {
    const nextMode =
      mode === SCENE_MODES.TOP ? SCENE_MODES.GAME : SCENE_MODES.TOP;
    setMode(nextMode);
  };

  return (
    <Button color="primary" variant="contained" onClick={handleClick}>
      mode change
    </Button>
  );
};

export const RoomIdIndicator: React.FC = (): JSX.Element => {
  const roomId = useRecoilValue(roomIdAtom);
  const label = `Room ID is: ${roomId ? roomId : "undefined"}`;
  return <Chip label={label} color="primary" sx={{ ml: 2, mr: 2 }} />;
};
