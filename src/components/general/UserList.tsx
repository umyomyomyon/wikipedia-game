import React from "react";

// mui
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";

// types
import { UserData } from "../../types/user";

interface UserListProps {
  users: UserData[];
}

export const dummyUserList: UserData[] = [
  { uuid: "edd730ad-67c8-4fa1-ab3e-8ac2fbb6e77d", name: "†卍メシア卍†" },
  { uuid: "c85a939d-18e2-45d3-b3b0-39a31d130e45", name: "test-user-desu" },
  { uuid: "d94bef0b-95e9-4944-b19b-c477f10e1a83", name: "wikipedia-game-man" },
  {
    uuid: "55d1fba2-798e-420a-8d62-64d64632b66c",
    name: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
];

export const UserList: React.FC<UserListProps> = ({ users }): JSX.Element => {
  return (
    <List sx={{ width: 300, marginLeft: "auto", marginRight: "auto" }}>
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <ListItem
            key={user.uuid}
            sx={{ paddingTop: 1 / 2, paddingBottom: 1 / 2 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
