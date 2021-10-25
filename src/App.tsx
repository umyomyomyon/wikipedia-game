import React from "react";

//mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

import { TopPageButtons } from "./components/TopPageButtons";
import { CreateRoomDialog } from "./components/CreateRoom/Dialog";
import { JoinDialog } from "./components/Join/Dialog";
import { WaitDialog } from "./components/Wait/Dialog";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const App: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Wrapper>
          <TopPageButtons />
        </Wrapper>
      </Container>
      <CreateRoomDialog open={false} />
      <JoinDialog open={false} />
      <WaitDialog open={true} />
    </React.Fragment>
  );
};

export default App;
