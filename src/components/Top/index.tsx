import React from "react";

//mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

import { TopPageButtons } from "./Buttons";
import { CreateRoomDialog } from "../CreateRoom/Dialog";
import { JoinDialog } from "../Join/Dialog";
import { WaitDialog } from "../Wait/Dialog";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Top: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Wrapper>
          <TopPageButtons />
        </Wrapper>
      </Container>
      <CreateRoomDialog open={false} />
      <JoinDialog open={false} />
      <WaitDialog open={false} />
    </React.Fragment>
  );
};
