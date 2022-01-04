import React from "react";

// mui
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// icons
import PersonIcon from "@mui/icons-material/Person";
import DoneIcon from "@mui/icons-material/Done";

// types
import { UserData } from "../../../types/user";

interface UserListProps {
  users: UserData[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <Stack spacing={1} maxWidth={200} position="absolute" top={20} left={20}>
      {users.map((user) => (
        <UserListItem user={user} key={user.uuid.slice(0, 4)} />
      ))}
    </Stack>
  );
};

interface UserListItemProps {
  user: UserData;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  return (
    <Stack direction="row">
      <Chip
        icon={user.isDone ? <DoneIcon /> : <PersonIcon />}
        label={user.name}
        color={user.isDone ? "primary" : undefined}
      />
    </Stack>
  );
};
