import React, { useState } from "react";
import { useRecoilValue } from "recoil";

// components
import { TopContent } from "../components/Top";
import { GameContent } from "../components/Game";
import { CreateRoomDialog } from "../components/CreateRoom/Dialog";
import { JoinDialog } from "../components/Join/Dialog";
import { WaitDialog } from "../components/Wait/Dialog";

// atoms
import { mode as modeAtom } from "../recoil/atoms/mode";
import { userNameConfirmed as userNameConfirmedAtom } from "../recoil/atoms/user";

// dev
import { ModeChangeButton } from "../components/dev";

export const Top: React.FC = (): JSX.Element => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState<boolean>(false);
  const [isWaitDialogOpen, setIsWaitDialogOpen] = useState<boolean>(false);
  const userNameConfirmed = useRecoilValue(userNameConfirmedAtom);
  const mode = useRecoilValue(modeAtom);

  const topPageButtonHandlers = {
    handleClickCreateRoomDialogOpen: () =>
      setIsCreateDialogOpen(!isCreateDialogOpen),
    handleClickJoinDialogOpen: () => setIsJoinDialogOpen(!isJoinDialogOpen),
    handleClickWaitDialogOpen: () => setIsWaitDialogOpen(!isWaitDialogOpen),
  };

  return (
    <React.Fragment>
      {mode === "top" ? (
        <TopContent enable={!!userNameConfirmed} {...topPageButtonHandlers} />
      ) : (
        <GameContent />
      )}
      <ModeChangeButton />
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
