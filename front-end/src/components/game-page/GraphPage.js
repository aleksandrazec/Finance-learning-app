import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

const GraphPage = ({ data }) => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to validate yyyy-mm-dd format
  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      // Validate input format
      if (!isValidDateFormat(data)) {
        setError(`Invalid date format. Please use yyyy-mm-dd format. Received: ${data}`);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Making API request to:', `/stock/year/${data}`);
        
        const response = await api.get(`/stock/year/${data}`);
        console.log('API Response:', response.data);
        
        // Ensure all dates in the response are in yyyy-mm-dd format
        const formattedData = response.data.map(item => ({
          ...item,
          Date: item.Date ? new Date(item.Date).toISOString().split('T')[0] : ''
        })).filter(item => item.Date); // Remove any items with invalid dates
        
        setStockData(formattedData);
      } catch (err) {
        console.error('Full error details:', err);
        setError(`Failed to fetch stock data: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [data]);

  if (loading) return <div>Loading graph...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stockData.length) return <div>No data available for the selected date</div>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="Date" 
            tickFormatter={(date) => new Date(date).toLocaleDateString()}
          />
          <YAxis 
            dataKey="Close"
            domain={['dataMin - 10', 'dataMax + 10']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Close Price']}
            labelFormatter={(date) => `Date: ${new Date(date).toLocaleDateString()}`}
          />
          <Line 
            type="monotone" 
            dataKey="Close" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphPage;