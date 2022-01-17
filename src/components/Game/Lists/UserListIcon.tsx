import React from "react";

// icons
import DoneIcon from "@mui/icons-material/Done";
import SurrenderIcon from "@mui/icons-material/Flag";

// components
import { PlayerIcon } from "../../general/PlayerIcon";

// types
import { UserData } from "../../../types/user";
import { ImmutableRoomData } from "../../../types/room";

interface UserListIconProps {
  isDone: boolean;
  isSurrendered: boolean;
  uuid: UserData["uuid"];
  host: ImmutableRoomData["host"];
}

export const UserListIcon: React.FC<UserListIconProps> = ({
  isDone,
  isSurrendered,
  uuid,
  host,
}) => {
  return (
    <React.Fragment>
      {isSurrendered ? (
        <SurrenderIcon />
      ) : isDone ? (
        <DoneIcon />
      ) : (
        <PlayerIcon uuid={uuid} host={host} />
      )}
    </React.Fragment>
  );
};
