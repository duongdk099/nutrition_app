'use client';
import { useProfileData } from '../components/profile_components/useProfileData'; // Custom hook for fetching data
import ProfileTable from '../components/profile_components/ProfileTable'; // Profile UI component

export default function ProfilePage() {
  const { meals, error, loading } = useProfileData(); // Destructure the values from the custom hook

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!meals.length) return <div>No meals found for the user.</div>;

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        {/* Use ProfileTable component to display the UI */}
        <ProfileTable meals={meals} />
      </div>
    </section>
  );
}