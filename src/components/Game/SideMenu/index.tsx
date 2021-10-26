import React from "react";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { UserList, dummyUserList } from "../../general/UserList";

interface SideMenuProps {
  menuWidth: number;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  menuWidth,
}): JSX.Element => {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          width: menuWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: menuWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <UserList users={dummyUserList} />
      </Drawer>
    </React.Fragment>
  );
};
