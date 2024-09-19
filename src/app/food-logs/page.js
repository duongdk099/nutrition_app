'use client';
import { useState, useEffect } from "react";
import SearchFood from "../components/SearchFood";
import FoodDetails from "../components/FoodDetails";
import FoodLogList from "../components/FoodLogList";
import { selectFoodItem } from "../api/nutritionixApi"; // Import the API helper
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

const FoodLogs = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodLogs, setFoodLogs] = useState([]);
  const [error, setError] = useState(null); // State to track error
  const [loading, setLoading] = useState(true); // State for loading

  const NUTRITIONIX_API_APP_ID = process.env.NEXT_PUBLIC_NUTRITIONIX_API_APP_ID;
  const NUTRITIONIX_API_APP_KEY = process.env.NEXT_PUBLIC_NUTRITIONIX_API_APP_KEY;

  useEffect(() => {
    const authToken = Cookies.get('authToken'); // Check if authToken exists

    if (!authToken || authToken === '') {
      // If no auth token is found, set error and stop loading
      setError('You are not logged in. Please log in to access this page.');
      setLoading(false);
    } else {
      // User is authenticated, stop loading
      setLoading(false);
    }
  }, []);

  const handleSelectFood = async (food) => {
    const nutritionalFood = await selectFoodItem(food.name, NUTRITIONIX_API_APP_ID, NUTRITIONIX_API_APP_KEY);
    if (nutritionalFood) {
      setSelectedFood(nutritionalFood);
    }
  };

  const handleAddFood = (food) => {
    setFoodLogs([...foodLogs, food]);
  };

  const handleEditFood = (index) => {
    const updatedLogs = [...foodLogs];
    updatedLogs[index].quantity = prompt("Enter new quantity:", updatedLogs[index].quantity);
    setFoodLogs(updatedLogs);
  };

  const handleDeleteFood = (index) => {
    setFoodLogs(foodLogs.filter((_, i) => i !== index));
  };

  if (loading) return <div>Loading...</div>; // Show loading while checking auth status
  if (error) return <div>{error}</div>; // Show error if user is not authenticated

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Food Logs</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <SearchFood
          onSelectFood={handleSelectFood}
          NUTRITIONIX_API_APP_ID={NUTRITIONIX_API_APP_ID}
          NUTRITIONIX_API_APP_KEY={NUTRITIONIX_API_APP_KEY}
        />
        <FoodDetails selectedFood={selectedFood} onAddFood={handleAddFood} />
      </div>
      <FoodLogList
        foodLogs={foodLogs}
        onEditFood={handleEditFood}
        onDeleteFood={handleDeleteFood}
      />
    </div>
  );
};

export default FoodLogs;