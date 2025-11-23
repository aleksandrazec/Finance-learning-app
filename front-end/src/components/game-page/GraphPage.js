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
    const timestamp = date.getTime();
    return typeof timestamp === 'number' && !isNaN(timestamp);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      // Check if data is provided
      if (!data) {
        setError('No date provided. Please select a date.');
        setLoading(false);
        return;
      }

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
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format from server');
        }

        // Ensure all dates in the response are in yyyy-mm-dd format
        const formattedData = response.data
          .map(item => {
            if (!item || typeof item !== 'object') return null;
            
            const date = item.Date ? new Date(item.Date) : null;
            const closePrice = parseFloat(item.Close);
            
            return {
              ...item,
              Date: date && !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : '',
              Close: !isNaN(closePrice) ? closePrice : 0
            };
          })
          .filter(item => item && item.Date && !isNaN(item.Close)); // Remove any items with invalid dates or prices
        
        console.log('Formatted data:', formattedData);
        setStockData(formattedData);
        
      } catch (err) {
        console.error('Full error details:', err);
        setError(`Failed to fetch stock data: ${err.response?.data?.message || err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [data]);

  if (loading) return <div className="loading">Loading graph...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!stockData.length) return <div className="no-data">No data available for the selected date</div>;

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="Date" 
            tickFormatter={(date) => {
              try {
                return new Date(date).toLocaleDateString();
              } catch {
                return date;
              }
            }}
          />
          <YAxis 
            dataKey="Close"
            domain={['dataMin - 10', 'dataMax + 10']}
            tickFormatter={(value) => `$${typeof value === 'number' ? value.toFixed(2) : '0.00'}`}
          />
          <Tooltip 
            formatter={(value) => {
              const numValue = typeof value === 'number' ? value : parseFloat(value);
              return [`$${!isNaN(numValue) ? numValue.toFixed(2) : '0.00'}`, 'Close Price'];
            }}
            labelFormatter={(date) => {
              try {
                return `Date: ${new Date(date).toLocaleDateString()}`;
              } catch {
                return `Date: ${date}`;
              }
            }}
          />
          <Line 
            type="monotone" 
            dataKey="Close" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphPage;