import React, { useState } from "react";

//mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

import { TopPageButtons } from "../components/Top/Buttons";
import { CreateRoomDialog } from "../components/CreateRoom/Dialog";
import { JoinDialog } from "../components/Join/Dialog";
import { WaitDialog } from "../components/Wait/Dialog";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Top: React.FC = (): JSX.Element => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState<boolean>(false);
  const [isWaitDialogOpen, setIsWaitDialogOpen] = useState<boolean>(false);

  const topPageButtonHandlers = {
    handleClickCreateRoomDialogOpen: () => setIsCreateDialogOpen(true),
    handleClickJoinDialogOpen: () => setIsJoinDialogOpen(true),
    handleClickWaitDialogOpen: () => setIsWaitDialogOpen(true),
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Wrapper>
          <TopPageButtons {...topPageButtonHandlers} />
        </Wrapper>
      </Container>
      <CreateRoomDialog
        open={isCreateDialogOpen}
        handleClose={() => setIsCreateDialogOpen(false)}
      />
      <JoinDialog
        open={isJoinDialogOpen}
        handleClose={() => setIsJoinDialogOpen(false)}
      />
      <WaitDialog
        open={isWaitDialogOpen}
        handleClose={() => setIsWaitDialogOpen(false)}
      />
    </React.Fragment>
  );
};
