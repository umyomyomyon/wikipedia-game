import React, { useMemo } from "react";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { extractTitleFromURL } from "../../utils/validations";

interface TargetProps {
  startOrGoal: "start" | "goal";
  url: string;
}

export const Target: React.FC<TargetProps> = ({
  startOrGoal,
  url,
}): JSX.Element => {
  const title = useMemo(() => extractTitleFromURL(url), [url]);

  return (
    <Stack direction="row">
      <Typography color="primary" sx={{ fontWeight: "bold", mr: 1 }}>
        {startOrGoal === "start" ? "START" : "GOAL"}:
      </Typography>
      <Link href={url} target="_blank" rel="noopener">
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
      </Link>
    </Stack>
  );
};
