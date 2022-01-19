import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// componens
import { UserPaths } from "./UserPaths";

// atoms
import { roomId as roomIdAtom } from "../../recoil/atoms/room";
import { mode as modeAtom } from "../../recoil/atoms/mode";

// types
import { Result } from "../../types/result";

// constants
import { SCENE_MODES } from "../../constants";

import { getResult } from "../../utils/result";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const ResultContent: React.FC = (): JSX.Element => {
  const [roomId, setRoomId] = useRecoilState(roomIdAtom);
  const setMode = useSetRecoilState(modeAtom);
  const [result, setResult] = useState<Result | undefined>(undefined);

  useEffect(() => {
    if (!roomId) return;
    getResult(roomId).then((result) => {
      setResult(result);
    });
  }, [roomId]);

  const handleClick = () => {
    setRoomId(undefined);
    setMode(SCENE_MODES.TOP);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
        <Wrapper>
          {result && (
            <UserPaths
              start={result.start}
              goal={result.goal}
              userResults={result.results}
            />
          )}
          <Button variant="contained" onClick={handleClick}>
            <Typography fontWeight="bold">TOPに戻る</Typography>
          </Button>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};
