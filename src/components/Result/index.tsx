import React, { useState, useEffect } from "react";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

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
  const roomId = 11119;
  const [result, setResult] = useState<Result | undefined>(undefined);
  console.log(result);

  useEffect(() => {
    getResult(roomId).then((result) => {
      setResult(result);
    });
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh", position: "relative" }}>
        <Wrapper>
          <p>This is result page.</p>
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};
