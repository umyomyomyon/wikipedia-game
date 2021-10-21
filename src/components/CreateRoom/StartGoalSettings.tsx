import React, { useState } from "react";

// mui
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { StartGoalSettingTextField } from "./StartGoalSettingTextField";
import { StartGoalSettingButtons } from "./StartGoalSettingButtons";

import {
  validateWikipediaUrl,
  extractTitleFromURL,
} from "../../utils/validations";

const SettingsContainer = styled(Stack)({
  width: "90%",
  marginLeft: "10%",
});

const makeContainer = (width: number) =>
  styled("div")({
    width,
  });

const TextContainer = makeContainer(53);
const TextFieldContainer = makeContainer(235);

export const StartGoalSettings: React.FC = (): JSX.Element => {
  const [startURL, setStartURL] = useState<string | undefined>(undefined);
  const [goalURL, setGoalURL] = useState<string | undefined>(undefined);
  const [startURLError, setStartURLError] = useState<boolean>(false);
  const [goalURLError, setGoalURLError] = useState<boolean>(false);
  const [startURLTitle, setStartURLTitle] = useState<string | undefined>(
    undefined
  );
  const [goalURLTitle, setGoalURLTitle] = useState<string | undefined>(
    undefined
  );

  const handleChange =
    (startOrGoal: "start" | "goal") =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const input = e.currentTarget.value;
      startOrGoal === "start" ? setStartURL(input) : setGoalURL(input);
    };

  const handleClick = (startOrGoal: "start" | "goal") => () => {
    const targetURL = startOrGoal === "start" ? startURL : goalURL;
    if (targetURL === undefined) return;
    if (!validateWikipediaUrl(targetURL)) {
      const errorStateHandler =
        startOrGoal === "start" ? setStartURLError : setGoalURLError;
      errorStateHandler(true);
    }
    const title = extractTitleFromURL(targetURL);
    const titleStateHandler =
      startOrGoal === "start" ? setStartURLTitle : setGoalURLTitle;
    titleStateHandler(title);
  };

  const handleCancelClick = (startOrGoal: "start" | "goal") => () => {
    const titleStateHandler =
      startOrGoal === "start" ? setStartURLTitle : setGoalURLTitle;
    titleStateHandler(undefined);
  };

  const handleStartChange = handleChange("start");
  const handleGoalChange = handleChange("goal");

  const handleStartURLClick = handleClick("start");
  const handleGoalURLClick = handleClick("goal");

  const handleStartCancelClick = handleCancelClick("start");
  const handleGoalCancelClick = handleCancelClick("goal");

  return (
    <SettingsContainer spacing={3}>
      <Stack direction="row" alignItems="center" spacing={3}>
        <TextContainer>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            START
          </Typography>
        </TextContainer>
        <TextFieldContainer>
          <StartGoalSettingTextField
            showURLTitle={Boolean(startURLTitle)}
            urlTitle={startURLTitle}
            handleChange={handleStartChange}
            handleFocus={() => setStartURLError(false)}
            error={startURLError}
          />
        </TextFieldContainer>
        <StartGoalSettingButtons
          urlTitle={startURLTitle}
          handleDoneClick={handleStartURLClick}
          handleCancelClick={handleStartCancelClick}
        />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={3}>
        <TextContainer>
          <Typography color="primary" sx={{ fontWeight: "bold" }}>
            GOAL
          </Typography>
        </TextContainer>
        <TextFieldContainer>
          <StartGoalSettingTextField
            showURLTitle={Boolean(goalURLTitle)}
            urlTitle={goalURLTitle}
            handleChange={handleGoalChange}
            handleFocus={() => setGoalURLError(false)}
            error={goalURLError}
          />
        </TextFieldContainer>
        <StartGoalSettingButtons
          urlTitle={goalURLTitle}
          handleDoneClick={handleGoalURLClick}
          handleCancelClick={handleGoalCancelClick}
        />
      </Stack>
    </SettingsContainer>
  );
};
