"use client";
import React, { useState } from 'react';
import NutritionalInfo from '../components/NutritionalInfo';

export default function NutritionalInfoPage() {
  const [mealNutrition, setMealNutrition] = useState({
    calories: 500,
    protein: 30,
    carbs: 45,
    fiber: 10
  });

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Nutritional Info</h1>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <NutritionalInfo nutrition={mealNutrition} />
        </div>
      </div>
    </section>
  );
}