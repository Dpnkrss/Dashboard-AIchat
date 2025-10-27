import { Box, Toolbar } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar, { drawerWidth } from './components/Sidebar';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Navbar />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            bgcolor: '#f5f5f5',
            p: 4,
            ml: { sm: `${drawerWidth}px` },
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
}
