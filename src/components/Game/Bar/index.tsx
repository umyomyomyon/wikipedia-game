import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface BarProps {
  menuWidth: number;
}

export const Bar: React.FC<BarProps> = ({ menuWidth }): JSX.Element => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${menuWidth}px)`, ml: `${menuWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Main Game View
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
