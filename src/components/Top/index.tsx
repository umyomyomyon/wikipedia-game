import React from "react";

// mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

// components
import { PlayerNameForm } from "./Form";
import { TopPageButtons } from "./Buttons";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

interface TopContentProps {
  enable: boolean;
  handleClickCreateRoomDialogOpen: () => void;
  handleClickJoinDialogOpen: () => void;
  handleClickWaitDialogOpen: () => void;
}

export const TopContent: React.FC<TopContentProps> = ({
  enable,
  handleClickCreateRoomDialogOpen,
  handleClickJoinDialogOpen,
  handleClickWaitDialogOpen,
}): JSX.Element => {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Wrapper>
        <PlayerNameForm />
        <TopPageButtons
          enable={enable}
          handleClickCreateRoomDialogOpen={handleClickCreateRoomDialogOpen}
          handleClickJoinDialogOpen={handleClickJoinDialogOpen}
          handleClickWaitDialogOpen={handleClickWaitDialogOpen}
        />
      </Wrapper>
    </Container>
  );
};
