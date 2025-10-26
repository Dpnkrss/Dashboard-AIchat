import { Box, Grid, Paper, Typography } from '@mui/material';

export default function Dashboard() {
  const cards = ['KPI 1', 'KPI 2', 'KPI 3', 'KPI 4', 'KPI 5'];

  return (
    <Box component='main' sx={{ flexGrow: 1, p: 3, ml: '200px' }}>
      <Typography variant='h5' gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card}>
            <Paper
              elevation={3}
              sx={{
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant='h6'>{card}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
