// components/UpdateMealLogItem.js
import { useState } from 'react';
import { updateMealLogItem } from '../../../services/mealLogItems'; // Import the function to update a meal log item

const UpdateMealLogItem = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMealLogItem = await updateMealLogItem(itemId, quantity);
      console.log('Meal log item updated:', updatedMealLogItem);
      setItemId('');
      setQuantity('');
    } catch (error) {
      console.error('Error updating meal log item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Update Meal Log Item</button>
    </form>
  );
};

export default UpdateMealLogItem;