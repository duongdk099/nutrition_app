"use client";
import { useState } from "react";

const FoodLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100); // default quantity in grams
  const [mealNumber, setMealNumber] = useState(1); // default meal number
  const [mealTime, setMealTime] = useState("08:00"); // default meal time
  const [foodLogs, setFoodLogs] = useState([]);
  const [foodDatabase, setFoodDatabase] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Nutritionix API credentials
  const NUTRITIONIX_API_APP_ID = "8fbcf942"; // Replace with your Nutritionix App ID
  const NUTRITIONIX_API_APP_KEY = "f4425ac4806df7300c501be9b78a3c3f"; // Replace with your Nutritionix App Key

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length > 2) {
      setLoading(true); // Start loading
      try {
        const res = await fetch(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${e.target.value}`,
          {
            headers: {
              "x-app-id": NUTRITIONIX_API_APP_ID,
              "x-app-key": NUTRITIONIX_API_APP_KEY,
              "x-remote-user-id": "0",
            },
          }
        );

        if (!res.ok) {
          console.error("Response status:", res.status);
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Data from Nutritionix:", data);

        // Display common foods for selection
        const commonFoods = data.common.map((food) => ({
          name: food.food_name,
        }));

        setFoodDatabase(commonFoods);
      } catch (error) {
        console.error("Error fetching data from Nutritionix:", error);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setFoodDatabase([]);
    }
  };

  // Function to handle selecting a food from the search results and getting its nutrients
  const handleSelectFood = async (food) => {
    setLoading(true); // Start loading

    try {
      const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
          "x-app-id": NUTRITIONIX_API_APP_ID,
          "x-app-key": NUTRITIONIX_API_APP_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: food.name,
        }),
      });

      if (!res.ok) {
        console.error("Response status:", res.status);
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Nutritional data from Nutritionix:", data);

      if (data.foods && data.foods.length > 0) {
        const nutrientData = data.foods[0]; // Get the first food item returned
        const selectedNutritionalFood = {
          name: nutrientData.food_name,
          calories: nutrientData.nf_calories || 0,
          protein: nutrientData.nf_protein || 0,
          fiber: nutrientData.nf_dietary_fiber || 0,
          carbs: nutrientData.nf_total_carbohydrate || 0,
        };

        setSelectedFood(selectedNutritionalFood);
      }
    } catch (error) {
      console.error("Error fetching nutritional data from Nutritionix:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAddFood = () => {
    if (selectedFood) {
      const newLog = { ...selectedFood, quantity, mealNumber, mealTime };
      setFoodLogs([...foodLogs, newLog]);
      setSelectedFood(null);
      setQuantity(100);
      setMealNumber(1); // reset to default
      setMealTime("08:00"); // reset to default
    }
  };

  const handleEditFood = (index) => {
    const updatedLogs = [...foodLogs];
    updatedLogs[index].quantity = prompt(
      "Enter new quantity:",
      updatedLogs[index].quantity
    );
    setFoodLogs(updatedLogs);
  };

  const handleDeleteFood = (index) => {
    setFoodLogs(foodLogs.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Food Logs</h1>

      {/* Search and Select Food */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Search Box */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 border rounded"
            placeholder="Search for food item..."
          />
          <ul className="mt-4 space-y-2">
            {loading ? (
              <li>Loading...</li>
            ) : (
              foodDatabase
                .filter((food) =>
                  food.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((food, index) => (
                  <li
                    key={index}
                    className="p-2 border rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSelectFood(food)}
                  >
                    {food.name}
                  </li>
                ))
            )}
          </ul>
        </div>

        {/* Selected Food Nutrition Info */}
        {selectedFood && (
          <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">{selectedFood.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Calories (per 100g): {selectedFood.calories}</p>
                <p>Protein: {selectedFood.protein} g</p>
              </div>
              <div>
                <p>Fiber: {selectedFood.fiber} g</p>
                <p>Carbs: {selectedFood.carbs} g</p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-2">Quantity (in grams):</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded"
              />

              {/* Meal Number Input */}
              <label className="block mt-4 mb-2">Meal Number:</label>
              <input
                type="number"
                value={mealNumber}
                onChange={(e) => setMealNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />

              {/* Meal Time Input */}
              <label className="block mt-4 mb-2">Meal Time:</label>
              <input
                type="time"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={handleAddFood}
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded"
              >
                Add Food Item
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Food Log List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Logged Foods</h2>
        <ul className="space-y-4">
          {foodLogs.map((log, index) => (
            <li key={index} className="p-4 border rounded">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{log.name}</h3>
                  <p>Meal: {log.mealNumber}</p>
                  <p>Time: {log.mealTime}</p>
                  <p>Quantity: {log.quantity} g</p>
                  <p>Calories: {(log.calories * log.quantity) / 100} kcal</p>
                  <p>Protein: {(log.protein * log.quantity) / 100} g</p>
                  <p>Fiber: {(log.fiber * log.quantity) / 100} g</p>
                  <p>Carbs: {(log.carbs * log.quantity) / 100} g</p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleEditFood(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFood(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodLogs;