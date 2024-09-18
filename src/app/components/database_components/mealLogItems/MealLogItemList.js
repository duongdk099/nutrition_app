// components/MealLogItemList.js
import { useEffect, useState } from 'react';
import { getMealLogItemsByLog } from '../../../services/mealLogItems'; // Import the function to get meal log items by log

const MealLogItemList = ({ logId }) => {
  const [mealLogItems, setMealLogItems] = useState([]);

  useEffect(() => {
    async function fetchMealLogItems() {
      try {
        const items = await getMealLogItemsByLog(logId);
        setMealLogItems(items);
      } catch (error) {
        console.error('Error fetching meal log items:', error);
      }
    }
    fetchMealLogItems();
  }, [logId]);

  return (
    <div>
      <h2>Meal Log Items for Log {logId}</h2>
      <ul>
        {mealLogItems.map((item) => (
          <li key={item.id}>{item.food_item_id} - {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealLogItemList;