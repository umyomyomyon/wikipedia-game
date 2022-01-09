import React, { useMemo } from "react";

// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// icons
import ArrowIcon from "@mui/icons-material/ArrowDropDown";

import { makeUrlAndTitlesFromUrls } from "../../utils/result";

interface PathProps {
  start: string;
  goal: string;
  urls: string[];
}

export const Path: React.FC<PathProps> = ({
  start,
  goal,
  urls,
}): JSX.Element => {
  const urlsAndTitles = useMemo(
    () => makeUrlAndTitlesFromUrls(start, goal, urls),
    [urls]
  );

  return (
    <Stack>
      {urlsAndTitles.map((item, index) => (
        <React.Fragment key={index}>
          <Link href={item.url} target="_blank" rel="noopener">
            <Typography fontWeight="bold">{item.title}</Typography>
          </Link>
          {!item.isLastItem && <ArrowIcon color="primary" />}
        </React.Fragment>
      ))}
    </Stack>
  );
};
