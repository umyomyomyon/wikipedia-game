import React, { useState } from "react";

// mui
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";

// components
import { StartGoalSettings } from "./StartGoalSettings";
import { UserList, dummyUserList } from "../UserList";

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
});

export const CreateRoomDialog: React.FC = (): JSX.Element => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const roomId = 38924;

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: { backgroundColor: "#e0e9f0", width: "80%" } }}
    >
      <DialogTitle color="primary" sx={{ fontWeight: "bold" }}>
        みんなで
      </DialogTitle>
      <DialogContent>
        <StartGoalSettings />
        <UserList users={dummyUserList} />
      </DialogContent>
      <Divider />
      <DialogActions
        sx={{
          justifyContent: "space-between",
          paddingRight: 3,
          paddingLeft: 3,
        }}
      >
        <StyledTypography color="primary">ROOM ID: {roomId}</StyledTypography>
        <Button variant="contained" disabled={!isReady}>
          <StyledTypography>START</StyledTypography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
