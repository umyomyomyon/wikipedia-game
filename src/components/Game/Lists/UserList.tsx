import React from "react";

// mui
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// icons
import PersonIcon from "@mui/icons-material/Person";
import DoneIcon from "@mui/icons-material/Done";

// components
import { PlayerIcon } from "../../general/PlayerIcon";

// types
import { UserData } from "../../../types/user";

interface UserListProps {
  users: UserData[];
  host: string | undefined;
}

export const UserList: React.FC<UserListProps> = ({ users, host }) => {
  return (
    <Stack spacing={1} maxWidth={200} position="absolute" top={20} left={20}>
      {users.map((user) => (
        <UserListItem user={user} host={host} key={user.uuid.slice(0, 4)} />
      ))}
    </Stack>
  );
};

interface UserListItemProps {
  user: UserData;
  host: string | undefined;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, host }) => {
  return (
    <Stack direction="row">
      <Chip
        icon={
          user.isDone ? (
            <DoneIcon />
          ) : (
            <PlayerIcon uuid={user.uuid} host={host} />
          )
        }
        label={user.name}
        color={user.isDone ? "primary" : undefined}
      />
    </Stack>
  );
};
