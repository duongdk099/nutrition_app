"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';

export default function ProfilePage() {
  // Initial state for meals (you can replace this with dynamic data later)
  const [meals, setMeals] = useState([
    {
      id: 1,
      whatWeAte: [
        { type: 'recipe', name: 'Delicious Salad Bowl', quantity: 1, unit: 'serving' },  // From Recipe Page
        { type: 'manual', name: 'Chicken Breast', quantity: 150, unit: 'grams' }           // Manually logged
      ],
      mealNumber: 1,
      time: '8:00 AM',
      nutrition: {
        calories: 350,
        protein: 30,
        carbs: 20,
        fiber: 5
      }
    },
    {
      id: 2,
      whatWeAte: [
        { type: 'recipe', name: 'Grilled Salmon', quantity: 1, unit: 'serving' },         // From Recipe Page
        { type: 'manual', name: 'Broccoli', quantity: 100, unit: 'grams' }                // Manually logged
      ],
      mealNumber: 2,
      time: '12:30 PM',
      nutrition: {
        calories: 400,
        protein: 35,
        carbs: 15,
        fiber: 6
      }
    }
  ]);

  // Function to delete a meal by id
  const handleDeleteMeal = (mealId) => {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);
  };

  // Function to handle edit (this is just a placeholder, in real use you could implement a modal or edit form)
  const handleEditMeal = (mealId) => {
    alert(`Edit functionality for meal with id ${mealId} can be implemented.`);
    // You could implement this to open a modal or inline form to edit meal details
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>

        {/* Meals Table */}
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Meals Summary</h2>

          {/* Table */}
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">What We Ate</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Meal Number</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nutrition</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id} className="border-b">
                  {/* What We Ate */}
                  <td className="px-6 py-4">
                    <ul>
                      {meal.whatWeAte.map((item, index) => (
                        <li key={index}>
                          <strong>{item.name}</strong> - {item.quantity} {item.unit} ({item.type === 'recipe' ? 'Recipe' : 'Manual'})
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Meal Number and Time */}
                  <td className="px-6 py-4">
                    <p>Meal {meal.mealNumber}</p>
                    <p>{meal.time}</p>
                  </td>

                  {/* Nutrition Info */}
                  <td className="px-6 py-4">
                    <p>Calories: {meal.nutrition.calories} kcal</p>
                    <p>Protein: {meal.nutrition.protein} g</p>
                    <p>Carbs: {meal.nutrition.carbs} g</p>
                    <p>Fiber: {meal.nutrition.fiber} g</p>
                  </td>

                  {/* Actions (Edit and Delete Buttons) */}
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditMeal(meal.id)}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}