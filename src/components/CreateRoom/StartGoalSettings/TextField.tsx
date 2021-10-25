import React from "react";

// mui
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

interface Props {
  showURLTitle: boolean;
  urlTitle: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  error: boolean;
}

export const StartGoalSettingTextField: React.FC<Props> = ({
  showURLTitle,
  urlTitle,
  handleChange,
  handleFocus,
  error,
}): JSX.Element => {
  return (
    <React.Fragment>
      {showURLTitle ? (
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {urlTitle}
        </Typography>
      ) : (
        <TextField
          onChange={handleChange}
          onFocus={handleFocus}
          error={error}
          helperText={error ? "正しいURLを入力してください" : undefined}
        />
      )}
    </React.Fragment>
  );
};
