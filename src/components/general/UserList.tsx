import React from "react";

// mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// components
import { PlayerIcon } from "./PlayerIcon";

// types
import { UserData } from "../../types/user";

interface UserListProps {
  users: UserData[];
  host: string | undefined;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  host,
}): JSX.Element => {
  return (
    <List sx={{ width: 300, marginLeft: "auto", marginRight: "auto" }}>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <ListItem
            key={user.uuid}
            sx={{ paddingTop: 1 / 2, paddingBottom: 1 / 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PlayerIcon uuid={user.uuid} host={host} />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
