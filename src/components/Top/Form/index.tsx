import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { getAuth, signInAnonymously } from "firebase/auth";

// mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// icons
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";

// component
import { SquareButton } from "../../general/SquareButton";

// atoms
import {
  userName as userNameAtom,
  userNameConfirmed as userNameConfirmedAtom,
} from "../../../recoil/atoms/user";

export const PlayerNameForm: React.FC = (): JSX.Element => {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [userNameConfirmed, setUserNameConfirmed] = useRecoilState(
    userNameConfirmedAtom
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleFirebaseUid = (uid: string) => {
    console.log(`firebase uid is: ${uid}`);
  };

  const handleClick = () => {
    if (!userName) return;
    setUserNameConfirmed(true);
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        if (auth.currentUser) {
          handleFirebaseUid(auth.currentUser.uid);
        }
      })
      .catch((err) => {
        console.error("firebase sign-in error.");
      });
  };

  const handleCancelClick = () => {
    setUserName("");
    setUserNameConfirmed(false);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ mb: 3, ml: 6 }}
    >
      {userNameConfirmed ? (
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {userName}
        </Typography>
      ) : (
        <TextField onChange={handleChange} placeholder="プレイヤー名を入力" />
      )}
      {userNameConfirmed ? (
        <SquareButton
          color="secondary"
          variant="contained"
          onClick={handleCancelClick}
        >
          <CancelIcon />
        </SquareButton>
      ) : (
        <SquareButton
          color="primary"
          variant="contained"
          onClick={handleClick}
          disabled={!userName}
        >
          <CheckIcon />
        </SquareButton>
      )}
    </Stack>
  );
};
