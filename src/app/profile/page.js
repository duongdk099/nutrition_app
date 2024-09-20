'use client';
import { useState } from 'react';
import { useProfileData } from '../components/profile_components/useProfileData'; // Custom hook for fetching data
import ProfileTable from '../components/profile_components/ProfileTable'; // Profile UI component

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const { meals, error, loading } = useProfileData(selectedDate); // Pass the selected date to the hook

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update selected date
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

        {/* Use ProfileTable component to display the UI */}
        <ProfileTable meals={meals} />
      </div>
    </section>
  );
}