import { AppBar, Toolbar, Typography } from '@mui/material';
import { drawerWidth } from './Sidebar';

export default function Navbar() {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant='h6'>SOME THEME</Typography>
      </Toolbar>
    </AppBar>
  );
}
