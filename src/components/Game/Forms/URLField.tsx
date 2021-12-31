import React from "react";

// mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// components
import { FormButtons } from "./Buttons";

interface URLFieldProps {
  url: string;
  error: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
  handleReturnClick: () => void;
  handleFocus: () => void;
}

export const URLField: React.FC<URLFieldProps> = ({
  url,
  error,
  handleChange,
  handleClick,
  handleReturnClick,
  handleFocus,
}): JSX.Element => {
  return (
    <Stack direction="row">
      <TextField
        placeholder="next"
        size="small"
        value={url}
        sx={{ mr: 1 }}
        onChange={handleChange}
        error={error}
        helperText={error ? "正しいURLを入力してください" : undefined}
        onFocus={handleFocus}
      />
      <FormButtons
        handleClick={handleClick}
        handleReturnClick={handleReturnClick}
      />
    </Stack>
  );
};
