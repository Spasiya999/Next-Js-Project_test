// pages/index.js
"use client";
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home = () => {
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await axios.get('http://worldtimeapi.org/api/timezone');
        setTimezones(response.data);
      } catch (error) {
        console.error('Error fetching timezones:', error);
      }
    };

    fetchTimezones();
  }, []);

  return (
    <div>
      <h1>World Time Display</h1>
      <table>
        <thead>
          <tr>
            <th>Country/Region</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {timezones.map((timezone) => (
            <tr key={timezone}>
              <td>
                <Link href={`/time/${timezone}`}>{timezone}</Link>
              </td>
              <td>
                <Link href={`/time/${timezone}`}>Get Current Time</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
