// components/FoodItemList.js
import { useEffect, useState } from 'react';
import { getAllFoodItems } from '../../../services/foodItems'; // Import the function to get all food items

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    async function fetchFoodItems() {
      try {
        const allFoodItems = await getAllFoodItems();
        setFoodItems(allFoodItems);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    }
    fetchFoodItems();
  }, []);

  return (
    <div>
      <h2>Food Items List</h2>
      <ul>
        {foodItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FoodItemList;