'use client';
import { useState, useEffect } from 'react';
import { getUserProfile } from '../services/getUserProfile';  // Import the service

export default function ProfilePage() {
  const [user, setUser] = useState(null);  // Store user info
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile(1);  // Fetch data for user with ID 1
        console.log('User Data:', userData);  // Log data to verify structure
        setUser(userData);  // Store the returned data
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error:', err);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  // Helper function to safely convert values to numbers and default to 0 if invalid
  const safeNumber = (value) => Number(value) || 0;

  // Helper function to format numbers to two decimal places
  const formatNumber = (num) => safeNumber(num).toFixed(2);

  // Calculate total nutrition for the entire day
  let totalDailyCalories = 0;
  let totalDailyProtein = 0;
  let totalDailyCarbs = 0;
  let totalDailyFiber = 0;
  let totalDailyFat = 0;

  // Iterate over all food logs to sum up total nutrition for the day
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
            {/* Create header row */}
            <div className="font-semibold">What We Ate</div>
            <div className="font-semibold">Meal Number</div>
            <div className="font-semibold">Meal Nutrition</div>
          </div>

          {/* Iterate over meals */}
          {user.foodLogs?.map((log, index) => {
            const totalCalories = log.foods?.reduce((sum, food) => sum + safeNumber(food.calories), 0);
            const totalProtein = log.foods?.reduce((sum, food) => sum + safeNumber(food.protein), 0);
            const totalCarbs = log.foods?.reduce((sum, food) => sum + safeNumber(food.carbs), 0);
            const totalFiber = log.foods?.reduce((sum, food) => sum + safeNumber(food.fiber), 0);
            const totalFat = log.foods?.reduce((sum, food) => sum + safeNumber(food.fat), 0);

            return (
              <div className="grid grid-cols-3 gap-4 mt-4" key={index}>
                {/* Left Column: What We Ate */}
                <div>
                  <ul>
                    {log.foods?.map((food, i) => (
                      <li key={i}>
                        <strong>{food.food_name}</strong> - {safeNumber(food.quantity_in_grams)}g
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Middle Column: Meal Number and Time */}
                <div>
                  <strong>Meal {index + 1}:</strong> {log.meal_time}
                </div>

                {/* Right Column: Total Nutrition for Each Meal */}
                <div>
                  <strong>Calories:</strong> {formatNumber(totalCalories)} kcal<br />
                  <strong>Protein:</strong> {formatNumber(totalProtein)}g<br />
                  <strong>Carbs:</strong> {formatNumber(totalCarbs)}g<br />
                  <strong>Fiber:</strong> {formatNumber(totalFiber)}g<br />
                  <strong>Fat:</strong> {formatNumber(totalFat)}g<br />
                </div>
              </div>
            );
          })}

          {/* Total Nutrition Summary for the Day */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Total Nutrition Summary for the Day</h2>
            <div>
              <strong>Calories:</strong> {formatNumber(totalDailyCalories)} kcal<br />
              <strong>Protein:</strong> {formatNumber(totalDailyProtein)}g<br />
              <strong>Carbs:</strong> {formatNumber(totalDailyCarbs)}g<br />
              <strong>Fiber:</strong> {formatNumber(totalDailyFiber)}g<br />
              <strong>Fat:</strong> {formatNumber(totalDailyFat)}g<br />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}