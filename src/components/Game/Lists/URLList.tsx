import React, { useMemo } from "react";

// mui
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";

import { extractTitleFromURL } from "../../../utils/validations";

const UrlListItem: React.FC<{ url: string }> = ({ url }) => {
  const title = useMemo(() => extractTitleFromURL(url), [url]);

  return (
    <ListItem>
      <Link href={url} target="_blank" rel="noopener">
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Link>
    </ListItem>
  );
};

interface UrlListProps {
  urls: string[];
}

export const UrlList: React.FC<UrlListProps> = ({ urls }) => {
  return (
    <List>
      {urls.map((url) => (
        <UrlListItem url={url} key={url} />
      ))}
    </List>
  );
};
