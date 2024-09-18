// components/UpdateFoodItem.js
import { useState } from 'react';
import { updateFoodItem } from '../../../services/foodItems'; // Import the function to update a food item

const UpdateFoodItem = () => {
  const [foodItemId, setFoodItemId] = useState('');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFoodItem = await updateFoodItem(foodItemId, name, calories, protein, fat, carbs);
      console.log('Food Item updated:', updatedFoodItem);
      setFoodItemId('');
      setName('');
      setCalories('');
      setProtein('');
      setFat('');
      setCarbs('');
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Item ID"
        value={foodItemId}
        onChange={(e) => setFoodItemId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <input
        type="number"
        placeholder="Protein"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />
      <input
        type="number"
        placeholder="Carbs"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />
      <button type="submit">Update Food Item</button>
    </form>
  );
};

export default UpdateFoodItem;