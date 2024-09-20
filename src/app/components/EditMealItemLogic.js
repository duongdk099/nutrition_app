"use client";
import React, { useState, useEffect } from "react";
import { updateMealItem, getMealItemById, deleteMealItem } from "../services/meal_items"; // Import deleteMealItem
import { getMealById, updateMeal, deleteMeal } from "../services/meals"; // Import deleteMeal
import EditMealItemUI from "./EditMealItemUI"; 
import { getMealItemsByMeal } from "../services/meal_items";

const safeNumber = (value) => Number(value) || 0;

export default function EditMealItemLogic({ mealItemId }) {
  const [mealItem, setMealItem] = useState(null); 
  const [meal, setMeal] = useState(null); 
  const [originalQuantity, setOriginalQuantity] = useState(null); 
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mealItemId) {
      const fetchMealItemData = async () => {
        try {
          const fetchedMealItem = await getMealItemById(mealItemId); 
          const mealItemData = Array.isArray(fetchedMealItem) ? fetchedMealItem[0] : fetchedMealItem;
          console.log("Meal Item Data:", mealItemData);
          setMealItem(mealItemData);

          setOriginalQuantity(safeNumber(mealItemData.food_quantity));

          if (mealItemData.meal_id) {
            const fetchedMeal = await getMealById(mealItemData.meal_id);
            const mealData = Array.isArray(fetchedMeal) ? fetchedMeal[0] : fetchedMeal;
            console.log("Meal Data:", mealData);
            setMeal(mealData);
          }
        } catch (err) {
          setError("Error fetching meal item or meal data");
          console.error(err);
        }
      };

      fetchMealItemData();
    }
  }, [mealItemId]);

  const handleUpdateMealItem = async () => {
    try {
      const newQuantity = safeNumber(mealItem.food_quantity); 
      if (!newQuantity) throw new Error("Quantity cannot be 0 or empty");

      const originalQuantity = safeNumber(mealItem.food_quantity);
      const scalingFactor = newQuantity / originalQuantity;

      const updatedMealItem = await updateMealItem(
        mealItem.meal_item_id,
        mealItem.food_name,
        newQuantity,
        mealItem.food_calories * scalingFactor,
        mealItem.food_protein * scalingFactor,
        mealItem.food_carb * scalingFactor,
        mealItem.food_fiber * scalingFactor
      );

      setMealItem(updatedMealItem);
      const now = new Date();
      const logDate = now.toISOString().slice(0, 19);

      if (meal) {
        const updatedMeal = await updateMeal(
          meal.meal_id,
          meal.meal_number,
          meal.meal_time,
          logDate
        );
        setMeal(updatedMeal);
      }

      alert("Meal item and meal updated successfully");
    } catch (err) {
      setError("Error updating meal item or meal: " + err.message);
      console.error(err);
    }
  };

  // New delete handler
  const handleDeleteMealItem = async () => {
    try {
      await deleteMealItem(mealItem.meal_item_id); // First, delete the meal item

      // Check if there are any other items left for this meal
      const remainingMealItems = await getMealItemsByMeal(meal.meal_id); // Fetch remaining meal items
      if (remainingMealItems.length === 0) {
        // If no other items remain, delete the meal as well
        await deleteMeal(meal.meal_id);
      }

      alert("Meal item and meal (if no other items) deleted successfully");
      // Optionally, redirect or refresh the page after deletion
    } catch (err) {
      setError("Error deleting meal item: " + err.message);
      console.error(err);
    }
  };

  if (error) return <div>{error}</div>;

  if (!mealItem || !meal || originalQuantity === null) return <div>Loading...</div>;

  const scalingFactor = mealItem.food_quantity / originalQuantity;
  const updatedNutrition = {
    calories: safeNumber(mealItem.food_calories) * scalingFactor,
    protein: safeNumber(mealItem.food_protein) * scalingFactor,
    carbs: safeNumber(mealItem.food_carb) * scalingFactor,
    fiber: safeNumber(mealItem.food_fiber) * scalingFactor,
  };

  return (
    <EditMealItemUI
      mealItem={mealItem}
      meal={meal}
      updatedNutrition={updatedNutrition}
      handleUpdateMealItem={handleUpdateMealItem}
      handleDeleteMealItem={handleDeleteMealItem} // Pass delete handler to UI
      setMealItem={setMealItem}
      setMeal={setMeal}
      safeNumber={safeNumber}
    />
  );
}