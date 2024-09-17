"use client";
import React, { useState } from 'react';
import MealList from '../components/MealList';

export default function ProfilePage() {
  const [meals, setMeals] = useState([
    {
      id: 1,
      whatWeAte: [
        { type: 'recipe', name: 'Delicious Salad Bowl', quantity: 1, unit: 'serving' },
        { type: 'manual', name: 'Chicken Breast', quantity: 150, unit: 'grams' }
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
    // Additional meals
  ]);

  const handleDeleteMeal = (mealId) => {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);
  };

  const handleEditMeal = (mealId) => {
    alert(`Edit functionality for meal with id ${mealId}`);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Meals Summary</h2>
          <MealList
            meals={meals}
            handleEditMeal={handleEditMeal}
            handleDeleteMeal={handleDeleteMeal}
          />
        </div>
      </div>
    </section>
  );
}