'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie to manage authentication token
import { getUserProfile } from '../services/getUserProfile';
import MealLog from '../components/profile_components/MealLog';
import TotalNutritionSummary from '../components/profile_components/TotalNutritionSummary';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  useEffect(() => {
    const authToken = Cookies.get('authToken'); // Get authToken from cookies

    if (!authToken || authToken === '') {
      // If no auth token is found or it's empty, user is not logged in
      setError('You are not logged in. Please log in first.');
      setLoading(false); // Stop loading when user is not logged in
      return;
    }

    // If auth token exists, fetch user data
    const fetchUserData = async () => {
      try {
        const object_authToken = JSON.parse(authToken);
        const userData = await getUserProfile(object_authToken.user_id); // Pass the authToken to fetch the user profile
        setUser(userData);
        setIsAuthenticated(true); // User is authenticated
        setLoading(false); // Stop loading after fetching the data
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error:', err);
        setLoading(false); // Stop loading if there's an error
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user && isAuthenticated) return <div>No user data found.</div>;

  // Helper function to safely convert values to numbers and default to 0 if invalid
  const safeNumber = (value) => Number(value) || 0;

  // Calculate total nutrition for the entire day
  let totalDailyCalories = 0;
  let totalDailyProtein = 0;
  let totalDailyCarbs = 0;
  let totalDailyFiber = 0;
  let totalDailyFat = 0;

  user.foodLogs?.forEach((log) => {
    log.foods?.forEach((food) => {
      totalDailyCalories += safeNumber(food.calories);
      totalDailyProtein += safeNumber(food.protein);
      totalDailyCarbs += safeNumber(food.carbs);
      totalDailyFiber += safeNumber(food.fiber);
      totalDailyFat += safeNumber(food.fat);
    });
  });

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Meal Information */}
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold">What We Ate</div>
            <div className="font-semibold">Meal Number</div>
            <div className="font-semibold">Meal Nutrition</div>
          </div>

          {/* Display all meal logs */}
          {user.foodLogs?.map((log, index) => (
            <MealLog key={index} log={log} mealNumber={index + 1} />
          ))}

          {/* Display total nutrition summary for the day */}
          <TotalNutritionSummary
            totalCalories={totalDailyCalories}
            totalProtein={totalDailyProtein}
            totalCarbs={totalDailyCarbs}
            totalFiber={totalDailyFiber}
            totalFat={totalDailyFat}
          />
        </div>
      </div>
    </section>
  );
}