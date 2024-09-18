// src/App.js (or your main component)
"use client";

import React, { useState, useEffect } from "react";
import CreateFoodItem from "../components/database_components/foodItems/CreateFoodItem"; // Import the CreateFoodItem component
import FoodItemList from "../components/database_components/foodItems/FoodItemList"; // Import the FoodItemList component
import UpdateFoodItem from "../components/database_components/foodItems/UpdateFoodItem";
import DeleteFoodItem from "../components/database_components/foodItems/DeleteFoodItem";

function App() {
  return (
    <div className="App">
      {/* Insert the CreateFoodItem component here */}
      <CreateFoodItem />
      <FoodItemList />
      <UpdateFoodItem />
      <DeleteFoodItem />
    </div>
  );
}

export default App;
