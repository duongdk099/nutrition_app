"use client";
import { useState } from 'react';

const FoodLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100); // default quantity in grams
  const [mealNumber, setMealNumber] = useState(1); // default meal number
  const [mealTime, setMealTime] = useState('08:00'); // default meal time
  const [foodLogs, setFoodLogs] = useState([]);

  // Example food data
  const foodDatabase = [
    { name: 'Chicken Breast', calories: 165, protein: 31, fiber: 0, carbs: 0 },
    { name: 'Broccoli', calories: 55, protein: 3.7, fiber: 2.4, carbs: 11.2 },
    { name: 'Apple', calories: 52, protein: 0.3, fiber: 2.4, carbs: 14 },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
  };

  const handleAddFood = () => {
    if (selectedFood) {
      const newLog = { ...selectedFood, quantity, mealNumber, mealTime };
      setFoodLogs([...foodLogs, newLog]);
      setSelectedFood(null);
      setQuantity(100);
      setMealNumber(1); // reset to default
      setMealTime('08:00'); // reset to default
    }
  };

  const handleEditFood = (index) => {
    const updatedLogs = [...foodLogs];
    updatedLogs[index].quantity = prompt("Enter new quantity:", updatedLogs[index].quantity);
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
            {foodDatabase
              .filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((food, index) => (
                <li
                  key={index}
                  className="p-2 border rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectFood(food)}
                >
                  {food.name}
                </li>
              ))}
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