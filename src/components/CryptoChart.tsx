import React from 'react';
import Chart from 'react-apexcharts';

interface CryptoChartProps {
  name: string;
  prices: [number, number][]; // [timestamp, price]
}

export default function CryptoChart({ name, prices }: CryptoChartProps) {
  const options = {
    chart: { id: 'crypto-line', toolbar: { show: false } },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false },
    },
    yaxis: {
      labels: { formatter: (val: number) => `$${val.toFixed(2)}` },
    },
    title: {
      text: `${name} Price History`,
      align: 'center',
    },
  };

  const series = [
    {
      name: `${name} USD`,
      data: prices.map(([timestamp, price]) => [timestamp, price]),
    },
  ];

  return <Chart options={options} series={series} type='line' height={350} />;
}
