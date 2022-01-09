import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

// componens
import { UserPaths } from "./UserPaths";

// atoms
import { roomId as roomIdAtom } from "../../recoil/atoms/room";

// types
import { Result } from "../../types/result";

import { getResult } from "../../utils/result";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const ResultContent: React.FC = (): JSX.Element => {
  const roomId = useRecoilValue(roomIdAtom);
  const [result, setResult] = useState<Result | undefined>(undefined);

  useEffect(() => {
    if (!roomId) return;
    getResult(roomId).then((result) => {
      setResult(result);
    });
  }, [roomId]);

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Wrapper>
          {result && (
            <UserPaths
              start={result.start}
              goal={result.goal}
              userResults={result.results}
            />
          )}
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};
