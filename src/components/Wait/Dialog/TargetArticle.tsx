import React from "react";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { makeContainer } from "../../../utils/styled";

const TextContainer = makeContainer(53);
const TargetTextContainer = makeContainer(235);

interface TargetArticleProps {
  startOrGoal: "start" | "goal";
  target: string | undefined;
}

export const TargetArticle: React.FC<TargetArticleProps> = ({
  target,
  startOrGoal,
}): JSX.Element => {
  const startGoalText = startOrGoal === "start" ? "START" : "GOAL";
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <TextContainer>
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {startGoalText}
        </Typography>
      </TextContainer>
      <TargetTextContainer>
        {target ? (
          <Typography color="primary" sx={{ fontWeight: "bold", fontSize: 24 }}>
            {target}
          </Typography>
        ) : (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="primary" fontWeight="bold">
              ホストが設定中
            </Typography>
            <CircularProgress />
          </Stack>
        )}
      </TargetTextContainer>
    </Stack>
  );
};
