import React from "react";

// icons
import PersonIcon from "@mui/icons-material/Person";
import HostIcon from "@mui/icons-material/Flag";

interface PlayerIconProps {
  uuid: string;
  host: string | undefined;
}

export const PlayerIcon: React.FC<PlayerIconProps> = ({
  uuid,
  host,
}): JSX.Element => {
  return (
    <React.Fragment>
      {uuid === host ? <HostIcon /> : <PersonIcon />}
    </React.Fragment>
  );
};
