"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';
import RecipeDetailsSection from '../../components/RecipeDetailsSection';
import CustomizeIngredients from '../../components/CustomizeIngredients';

export default function RecipeDetailsPage({ params }) {
  const recipeId = params.id;  // Access the dynamic [id] parameter

  const [recipe, setRecipe] = useState({
    title: "Delicious Salad Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    ingredients: [
      { name: "Fresh spinach", quantity: 2, unit: "cups" },
      { name: "Cherry tomatoes", quantity: 0.5, unit: "cup" },
      { name: "Avocado", quantity: 0.5, unit: "sliced" },
      { name: "Feta cheese", quantity: 0.25, unit: "cup" },
      { name: "Olive oil", quantity: 1, unit: "tbsp" },
      { name: "Lemon juice", quantity: 1, unit: "tbsp" },
      { name: "Salt and pepper", quantity: "1", unit: "tbsp" }
    ],
    instructions: [
      "Wash and dry the spinach.",
      "Slice the cherry tomatoes and avocado.",
      "Mix the spinach, tomatoes, avocado, and feta cheese in a large bowl.",
      "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
      "Pour the dressing over the salad and toss to combine.",
      "Serve immediately and enjoy!"
    ],
    nutrition: {
      calories: 250,
      protein: "6g",
      fat: "18g",
      carbs: "12g"
    }
  });

  const [customQuantities, setCustomQuantities] = useState(recipe.ingredients.map((ingredient) => ingredient.quantity));

  const handleCustomQuantityChange = (e, index) => {
    const newQuantities = [...customQuantities];
    newQuantities[index] = e.target.value;
    setCustomQuantities(newQuantities);
  };

  const handleAddToMeal = () => {
    alert(`Added ${recipe.title} with custom quantities to your meal of the day.`);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Recipe Title */}
        <h1 className="text-4xl font-bold text-center mb-8">{recipe.title}</h1>

        {/* Recipe Image */}
        <div className="max-w-4xl mx-auto mb-8">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Recipe Details Section */}
        <RecipeDetailsSection 
          ingredients={recipe.ingredients} 
          instructions={recipe.instructions} 
          nutrition={recipe.nutrition} 
        />

        {/* Customize Ingredients Section */}
        <CustomizeIngredients 
          ingredients={recipe.ingredients}
          customQuantities={customQuantities}
          handleCustomQuantityChange={handleCustomQuantityChange}
          handleAddToMeal={handleAddToMeal}
        />
      </div>
    </section>
  );
}