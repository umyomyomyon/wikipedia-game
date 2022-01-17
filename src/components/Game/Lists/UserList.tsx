import React from "react";

// mui
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

// components
import { UserListIcon } from "./UserListIcon";

// types
import { UserData } from "../../../types/user";
import { ImmutableRoomData } from "../../../types/room";

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
  host: ImmutableRoomData["host"];
}

const pickColor = (isDone: boolean, isSurrendered: boolean) => {
  if (isSurrendered) return "secondary";
  if (isDone) return "primary";
};

const UserListItem: React.FC<UserListItemProps> = ({ user, host }) => {
  const color = pickColor(user.isDone, user.isSurrendered);
  return (
    <Stack direction="row">
      <Chip
        icon={
          <UserListIcon
            isDone={user.isDone}
            isSurrendered={user.isSurrendered}
            uuid={user.uuid}
            host={host}
          />
        }
        label={user.name}
        color={color}
      />
    </Stack>
  );
};
