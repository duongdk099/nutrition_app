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
        const mealDataWithItems = await Promise.all(
          userMeals.map(async (meal) => {
            const foodItems = await getMealItemsByMeal(meal.meal_id);
            return { ...meal, foodItems };
          })
        );

        setMeals(mealDataWithItems); // Set meals with their food items
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