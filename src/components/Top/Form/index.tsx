import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

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
  userUuid as userUuidAtom,
} from "../../../recoil/atoms/user";

import { validateUserName } from "../../../utils/validations";

export const PlayerNameForm: React.FC = (): JSX.Element => {
  const [formError, setFormError] = useState<boolean>(false);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [userNameConfirmed, setUserNameConfirmed] = useRecoilState(
    userNameConfirmedAtom
  );
  const setUserUuid = useSetRecoilState(userUuidAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  const handleClick = () => {
    if (!userName) return;

    if (!validateUserName(userName)) {
      setFormError(true);
      return;
    }

    setUserNameConfirmed(true);

    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        if (auth.currentUser) {
          setUserUuid(auth.currentUser.uid);
        }
      })
      .catch((err) => {
        console.error("firebase sign-in error.");
      });
  };

  const handleCancelClick = () => {
    setUserName("");
    setUserUuid(undefined);
    setUserNameConfirmed(false);
    setFormError(false);
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
        <TextField
          onChange={handleChange}
          placeholder="???????????????????????????"
          error={formError}
          helperText={
            formError ? "15????????????????????????????????????????????????????????????" : undefined
          }
          onFocus={() => setFormError(false)}
        />
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
