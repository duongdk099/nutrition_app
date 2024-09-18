// components/DeleteFoodItem.js
import { useState } from 'react';
import { deleteFoodItem } from '../../../services/foodItems'; // Import the function to delete the food item

const DeleteFoodItem = () => {
  const [foodItemId, setFoodItemId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteFoodItem(foodItemId);
      console.log(`Food item ${foodItemId} deleted`);
      setFoodItemId('');
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="Food Item ID"
        value={foodItemId}
        onChange={(e) => setFoodItemId(e.target.value)}
      />
      <button type="submit">Delete Food Item</button>
    </form>
  );
};

export default DeleteFoodItem;