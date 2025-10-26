import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

export const drawerWidth = 200;

export default function Sidebar() {
  const items = ['Dashboard', 'Analytics 📈', 'Settings ⚙️', 'Reports 📊'];

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        {items.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
