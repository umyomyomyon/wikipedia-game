import React, { useMemo } from "react";

// mui
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Path } from "./Path";
import { ResultIcon } from "./ResultIcon";

// types
import { UserResult } from "../../types/result";

import { makeWinnerLength } from "../../utils/result";
import { COLORS } from "../../conf";

const IconContainer = styled("div")({
  width: 30,
});

interface UserPathsProps {
  start: string;
  goal: string;
  userResults: UserResult[];
}

export const UserPaths: React.FC<UserPathsProps> = ({
  start,
  goal,
  userResults,
}) => {
  const winnerLength = useMemo(
    () => makeWinnerLength(userResults),
    [userResults]
  );

  return (
    <React.Fragment>
      {userResults.map((userResult) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          marginBottom={2}
          marginTop={2}
          key={userResult.uuid}
          sx={{
            borderRadius: 1,
            border: `1px solid ${COLORS.primary}`,
            padding: 2,
          }}
        >
          <IconContainer>
            <ResultIcon
              isWinner={userResult.urls.length === winnerLength}
              isSurrendered={userResult.isSurrendered}
            />
          </IconContainer>
          <Typography
            color="primary"
            fontSize={18}
            minWidth={100}
            sx={{ fontWeight: "bold" }}
          >
            {userResult.name}
          </Typography>
          {!userResult.isSurrendered && (
            <Path start={start} goal={goal} urls={userResult.urls} />
          )}
        </Stack>
      ))}
    </React.Fragment>
  );
};
