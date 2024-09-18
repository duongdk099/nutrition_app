// components/CreateMealLogItem.js
import { useState } from 'react';
import { createMealLogItem } from '../../../services/mealLogItems'; // Import the function to create a meal log item

const CreateMealLogItem = () => {
  const [logId, setLogId] = useState('');
  const [foodItemId, setFoodItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMealLogItem = await createMealLogItem(logId, foodItemId, quantity);
      console.log('Meal log item created:', newMealLogItem);
      setLogId('');
      setFoodItemId('');
      setQuantity('');
    } catch (error) {
      console.error('Error creating meal log item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Log ID"
        value={logId}
        onChange={(e) => setLogId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Item ID"
        value={foodItemId}
        onChange={(e) => setFoodItemId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Create Meal Log Item</button>
    </form>
  );
};

export default CreateMealLogItem;