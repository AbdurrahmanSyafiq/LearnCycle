'use client'
import React, { useState } from 'react';
import { format, eachDayOfInterval, isSaturday, isSunday } from 'date-fns';

const DateRangeApp = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weekendDays, setWeekendDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = eachDayOfInterval({ start, end }).filter(
      (date) => isSaturday(date) || isSunday(date)
    );
    setWeekendDays(days);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Tanggal Akhir Pekan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Tanggal Awal:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Tanggal Akhir:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Submit
          </button>
        </form>
        {weekendDays.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl text-white mb-2">Hari Sabtu dan Minggu:</h3>
            <ul className="text-white">
              {weekendDays.map((date, index) => (
                <li key={index} className="mb-1">
                  {format(date, 'EEEE, dd MMMM yyyy')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeApp;
