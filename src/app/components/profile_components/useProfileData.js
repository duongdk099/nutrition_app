import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies
import { getMealsByUser } from '../../services/meals'; // Import your services for meals and meal items
import { getMealItemsByMeal } from '../../services/meal_items';

export function useProfileData() {
  const [meals, setMeals] = useState([]); // State to store user's meals
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const authToken = Cookies.get('authToken'); // Get authToken from cookies

    if (!authToken || authToken === '') {
      setError('You are not logged in. Please log in first.');
      setLoading(false);
      return;
    }

    const object_authToken = JSON.parse(authToken);
    const userId = object_authToken.user_id; // Extract user_id from token

    const fetchMeals = async () => {
      try {
        const userMeals = await getMealsByUser(userId);

        // Get today's date in local format (YYYY-MM-DD)
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Function to format log_date to YYYY-MM-DD in local time
        const formatDateLocal = (dateString) => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0'); // Get the day of the month
          return `${year}-${month}-${day}`;
        };

        console.log('user meals data:', userMeals);
        console.log('date from user', formatDateLocal(userMeals[4].log_date));
        console.log('today ', formatDateLocal(today));
        
        // Filter meals for today's date
        const todayMeals = userMeals.filter(meal => formatDateLocal(meal.log_date) === formatDateLocal(today));

        const mealDataWithItems = await Promise.all(
          todayMeals.map(async (meal) => {
            const foodItems = await getMealItemsByMeal(meal.meal_id);
            return { ...meal, foodItems };
          })
        );

        setMeals(mealDataWithItems); // Set meals with their food items for today
        setLoading(false);
      } catch (err) {
        setError('Failed to load meals data');
        console.error('Error:', err);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, error, loading };
}