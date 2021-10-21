import React from "react";

//mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

import { TopPageButtons } from "./components/TopPageButtons";
import { CreateRoomDialog } from "./components/CreateRoom/CreateRoomDialog";

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
      <CreateRoomDialog />
    </React.Fragment>
  );
};

export default App;
