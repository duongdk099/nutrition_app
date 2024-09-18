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
      <table>
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Food Name</th>
            <th>Quantity (grams)</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fiber (g)</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item) => (
            <tr key={item.food_id}>
              <td>{item.food_id}</td>
              <td>{item.food_name}</td>
              <td>{item.quantity_in_grams}</td>
              <td>{item.calories}</td>
              <td>{item.protein}</td>
              <td>{item.carbs}</td>
              <td>{item.fiber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;