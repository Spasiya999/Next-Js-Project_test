"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

const TimezonePage = ({ params }) => {
  const [timeData, setTimeData] = useState(null);
  const [error, setError] = useState(null); // For error handling
  console.log('params:', params);

  // Log timeData state on every render
  useEffect(() => {
    console.log('Current timeData state:', timeData);
  });

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        console.log('Timezone param:', params.timezone); // Log timezone param

        // Correct the URL to include both timezone and city
        const url = `http://worldtimeapi.org/api/timezone/${params.timezone}/${params.city}`;
        console.log(`Fetching data from: ${url}`); // Log the API call URL

        const response = await axios.get(url);
        console.log('Fetched data:', response.data); // Log the entire response data

        // Check if response.data is what we expect before setting it
        if (response.data) {
          setTimeData(response.data);
        } else {
          console.error('No data found in response');
        }
      } catch (error) {
        console.error('Error fetching time data:', error);
        setError('Error fetching time data. Please try again.'); // Set error message
      }
    };

    fetchTimeData();
  }, [params.timezone, params.city]); // Add params.city as a dependency

  console.log('timeData:', timeData);

  if (error) return <div>{error}</div>; // Display error message if there is an error
  if (!timeData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Current Time in {params.timezone}</h1>
      <p>Datetime: {timeData.datetime}</p>
      <p>Timezone: {timeData.timezone}</p>
      <p>UTC Offset: {timeData.utc_offset}</p>
      <p>Daylight Saving Time: {timeData.dst ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TimezonePage;
