'use client';
import { useState } from 'react';
import { useProfileData } from '../components/profile_components/useProfileData'; // Custom hook for fetching data
import ProfileTable from '../components/profile_components/ProfileTable'; // Profile UI component

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sortOption, setSortOption] = useState('meal_number'); // Default sorting option
  const { meals, error, loading } = useProfileData(selectedDate, sortOption);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>

        {/* Date Picker for choosing which day's log to display */}
        <div className="text-center mb-8">
          <label className="text-lg mr-2">Choose a Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border rounded"
          />
        </div>

        {/* Dropdown to select sort option */}
        <div className="text-center mb-8">
          <label className="text-lg mr-2">Sort by:</label>
          <select value={sortOption} onChange={handleSortChange} className="p-2 border rounded">
            <option value="meal_number">Meal Number</option>
            <option value="meal_time">Meal Time</option>
          </select>
        </div>

        {/* Use ProfileTable component to display the UI */}
        <ProfileTable meals={meals} />
      </div>
    </section>
  );
}