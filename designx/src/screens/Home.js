// Import necessary libraries
import React, { useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import ECharts from 'echarts-for-react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

// Function to generate random data for the charts
const generateRandomData = () => {
  return Math.floor(Math.random() * 100) + 1; // Change this based on your data requirements
};

// Chart component with loading indicator
const ChartCard = ({ chartKey, options, loading, onRefresh }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Chart {chartKey}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <ECharts option={options} />
        )}
        <Button onClick={onRefresh}>Refresh {chartKey}</Button>
      </CardContent>
    </Card>
  );
};

// Main functional component
const Home = () => {
  // State to manage data for each chart and loading state
  const [chartData, setChartData] = useState({
    chart1: generateRandomData(),
    chart2: generateRandomData(),
    chart3: generateRandomData(),
  });

  // Function to handle individual chart refresh
  const handleRefresh = async (chartKey) => {
    // Simulate an asynchronous operation (API call, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setChartData((prevData) => ({
      ...prevData,
      [chartKey]: generateRandomData(),
    }));
  };

  // ECharts options for a basic pie chart
  const pieChartOptions = {
    series: [
      {
        type: 'pie',
        data: [
          { value: chartData.chart1, name: 'Category A' },
          { value: 100 - chartData.chart1, name: 'Category B' },
        ],
      },
    ],
  };

  // ECharts options for a basic bar chart
  const barChartOptions = {
    xAxis: {
      type: 'category',
      data: ['Category A', 'Category B'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: [chartData.chart2, 100 - chartData.chart2],
      },
    ],
  };

  // Layout settings for the grid
  const layout = [
    { i: 'chart1', x: 0, y: 0, w: 1, h: 1 },
    { i: 'chart2', x: 1, y: 0, w: 1, h: 1 },
    { i: 'chart3', x: 2, y: 0, w: 1, h: 1 },
  ];

  return (
    <ReactGridLayout className="layout" layout={layout} cols={3} rowHeight={300} width={1200}>
      {Object.keys(chartData).map((chartKey, index) => (
        <div key={chartKey}>
          <ChartCard
            chartKey={chartKey}
            options={index === 0 ? pieChartOptions : barChartOptions}
            loading={false} // Replace with actual loading state if needed
            onRefresh={() => handleRefresh(chartKey)}
          />
        </div>
      ))}
    </ReactGridLayout>
  );
};

export default Home;
