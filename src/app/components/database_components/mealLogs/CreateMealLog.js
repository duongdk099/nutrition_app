// components/CreateMealLog.js
import { useState } from 'react';
import { createMealLog } from '../../../services/mealLogs'; // Import the function to create a meal log

const CreateMealLog = () => {
  const [userId, setUserId] = useState('');
  const [mealType, setMealType] = useState('');
  const [logDate, setLogDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMealLog = await createMealLog(userId, mealType, logDate);
      console.log('Meal log created:', newMealLog);
      setUserId('');
      setMealType('');
      setLogDate('');
    } catch (error) {
      console.error('Error creating meal log:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Meal Type"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      />
      <input
        type="date"
        value={logDate}
        onChange={(e) => setLogDate(e.target.value)}
      />
      <button type="submit">Create Meal Log</button>
    </form>
  );
};

export default CreateMealLog;