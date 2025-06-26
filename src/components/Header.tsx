import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ fontSize: 24 }}>Travel Advisor</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
