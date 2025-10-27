import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { getCryptoPrices, CryptoPrice } from '../services/cryptoApi';
import { getCryptoHistory } from '../services/historyApi';
import CryptoChart from '../components/CryptoChart';

export default function Dashboard() {
  const [data, setData] = useState<CryptoPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [chartData, setChartData] = useState<[number, number][] | null>(null);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');

  useEffect(() => {
    async function fetchData() {
      try {
        const prices = await getCryptoPrices();
        setData(prices);
        setLastUpdated(new Date());

        const history = await getCryptoHistory('bitcoin');
        setChartData(history.prices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 40000);

    return () => clearInterval(interval); // cleanup when component unmounts
  }, []);

  useEffect(() => {
    async function loadChart() {
      const history = await getCryptoHistory(selectedCoin);
      setChartData(history.prices);
    }
    loadChart();
  }, [selectedCoin]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='80vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 6, width: '100%' }}>
      {/* make the inner panel full width and give horizontal padding */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#fafafa',
          borderRadius: 2,
          p: { xs: 3, md: 5 }, // a bit more padding
          px: { xs: 3, md: 8 }, // wider horizontal padding so panel feels spacious
          minHeight: '70vh', // expand vertical space
        }}
      >
        <Typography variant='h5' gutterBottom>
          Live Crypto Prices 💰
        </Typography>

        {lastUpdated && (
          <Typography variant='caption' color='text.secondary' gutterBottom>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Typography>
        )}

        {/* center the cards horizontally */}
        <Grid container spacing={2} justifyContent='center'>
          {data &&
            Object.entries(data).map(([coin, info]) => (
              <Grid item xs={10} sm={6} md={3} lg={2} key={coin}>
                <Paper
                  elevation={selectedCoin === coin ? 8 : 4} // 🔥 More shadow if selected
                  sx={{
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.2s',
                    cursor: 'pointer',
                    border:
                      selectedCoin === coin ? '2px solid #1976d2' : 'none', // ✅ Highlight selected
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                  }}
                  onClick={() => setSelectedCoin(coin)} // ✅ Select coin on click
                >
                  <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
                    {coin}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    ${info.usd.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>

        {chartData && (
          <Box mt={5} sx={{ width: '100%' }}>
            <CryptoChart name={selectedCoin} prices={chartData} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
