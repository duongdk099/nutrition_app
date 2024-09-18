// components/DeleteMealLogItem.js
import { useState } from 'react';
import { deleteMealLogItem } from '../../../services/mealLogItems'; // Import the function to delete a meal log item

const DeleteMealLogItem = () => {
  const [itemId, setItemId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteMealLogItem(itemId);
      console.log(`Meal log item ${itemId} deleted`);
      setItemId('');
    } catch (error) {
      console.error('Error deleting meal log item:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <button type="submit">Delete Meal Log Item</button>
    </form>
  );
};

export default DeleteMealLogItem;