import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import GraphPage from "./GraphPage";

function FinishScreen() {
  // Get the currentDate from the Outlet context
  const { currentDate } = useOutletContext();

  // Format the date to ensure it's in yyyy-mm-dd format
  const formatDate = (date) => {
    if (!date) return '';
    
    try {
      // If it's already a Date object
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      
      // If it's a string, try to parse and format
      const parsedDate = new Date(date);
      if (parsedDate instanceof Date && !isNaN(parsedDate)) {
        return parsedDate.toISOString().split('T')[0];
      }
      
      return '';
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const formattedDate = formatDate(currentDate);

  console.log('Original date:', currentDate);
  console.log('Formatted date:', formattedDate);

  return (
    <div>
      <h1>The Graph after a year</h1>
      <h2>Game Date: {currentDate ? new Date(currentDate).toLocaleDateString() : 'No date available'}</h2>
      
      {formattedDate ? (
        <GraphPage data={formattedDate} />
      ) : (
        <div style={{ color: 'red' }}>
          Cannot display graph. Invalid or missing date: "{currentDate}"
        </div>
      )}
    </div>
  );
}

export default FinishScreen;