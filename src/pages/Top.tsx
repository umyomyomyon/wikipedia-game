import React, { useState } from "react";
import { useRecoilValue } from "recoil";

//mui
import { styled } from "@mui/system";
import Container from "@mui/material/Container";

import { TopPageButtons } from "../components/Top/Buttons";
import { CreateRoomDialog } from "../components/CreateRoom/Dialog";
import { JoinDialog } from "../components/Join/Dialog";
import { WaitDialog } from "../components/Wait/Dialog";
import { PlayerNameForm } from "../components/Top/Form";

// atoms
import { userNameConfirmed as userNameConfirmedAtom } from "../recoil/atoms/user";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const Top: React.FC = (): JSX.Element => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState<boolean>(false);
  const [isWaitDialogOpen, setIsWaitDialogOpen] = useState<boolean>(false);
  const userNameConfirmed = useRecoilValue(userNameConfirmedAtom);

  const topPageButtonHandlers = {
    handleClickCreateRoomDialogOpen: () =>
      setIsCreateDialogOpen(!isCreateDialogOpen),
    handleClickJoinDialogOpen: () => setIsJoinDialogOpen(!isJoinDialogOpen),
    handleClickWaitDialogOpen: () => setIsWaitDialogOpen(!isWaitDialogOpen),
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Wrapper>
          <PlayerNameForm />
          <TopPageButtons
            enable={!!userNameConfirmed}
            {...topPageButtonHandlers}
          />
        </Wrapper>
      </Container>
      <CreateRoomDialog
        open={isCreateDialogOpen}
        handleClose={() => setIsCreateDialogOpen(false)}
      />
      <JoinDialog
        open={isJoinDialogOpen}
        handleClose={() => setIsJoinDialogOpen(false)}
        handleOpenWaitDialog={() => setIsWaitDialogOpen(true)}
      />
      <WaitDialog
        open={isWaitDialogOpen}
        handleClose={() => setIsWaitDialogOpen(false)}
      />
    </React.Fragment>
  );
};
