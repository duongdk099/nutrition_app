"use client"; // Mark this component as a Client Component

import React, { useState } from 'react';

export default function RecipeDetailsPage({ params }) {
  const recipeId = params.id;  // Access the dynamic [id] parameter

  // Placeholder data for the recipe (you can replace this with real data)
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

  // Function to handle quantity change in the editable box
  const handleCustomQuantityChange = (e, index) => {
    const newQuantities = [...customQuantities];
    newQuantities[index] = e.target.value;
    setCustomQuantities(newQuantities);
  };

  const handleAddToMeal = () => {
    alert(`Added ${recipe.title} with custom quantities to your meal of the day.`);
    // This is where you'd typically handle saving the customized meal to a meal plan (for now, just an alert).
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

        {/* Recipe Ingredients (display-only) */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>

          {/* Display-only ingredients */}
          <ul className="list-disc list-inside space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Recipe Instructions */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))}
          </ol>
        </div>

        {/* Nutritional Information */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nutritional Information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Calories</h3>
              <p>{recipe.nutrition.calories} kcal</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Protein</h3>
              <p>{recipe.nutrition.protein}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Fat</h3>
              <p>{recipe.nutrition.fat}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Carbohydrates</h3>
              <p>{recipe.nutrition.carbs}</p>
            </div>
          </div>
        </div>

        {/* Custom Quantity Input and Add to Meal Button */}
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Customize Ingredient Quantities</h2>

          {/* Editable ingredients in the additional box */}
          <ul className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-gray-700">{ingredient.name}</span>
                <input
                  type="number"
                  value={customQuantities[index]}
                  onChange={(e) => handleCustomQuantityChange(e, index)}
                  className="w-24 px-4 py-2 border rounded-lg"
                />
                <span className="text-gray-700">{ingredient.unit}</span>
              </li>
            ))}
          </ul>

          {/* Add to Meal Button */}
          <div className="mt-4 text-right">
            <button
              onClick={handleAddToMeal}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
            >
              Add to Your Meal of the Day
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}