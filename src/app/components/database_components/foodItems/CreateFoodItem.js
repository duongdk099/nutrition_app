// components/CreateFoodItem.js
import { useState } from 'react';
import { createFoodItem } from '../../../services/foodItems'; // Import the function for creating food items

const CreateFoodItem = () => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFoodItem = await createFoodItem(name, calories, protein, fat, carbs);
      console.log('Food Item created:', newFoodItem);
      setName(''); // Clear form inputs
      setCalories('');
      setProtein('');
      setFat('');
      setCarbs('');
    } catch (error) {
      console.error('Error creating food item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Name"
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
      <button type="submit">Create Food Item</button>
    </form>
  );
};

export default CreateFoodItem;