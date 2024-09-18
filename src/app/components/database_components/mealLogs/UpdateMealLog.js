// components/UpdateMealLog.js
import { useState } from 'react';
import { updateMealLog } from '../../../services/mealLogs'; // Import the function to update a meal log

const UpdateMealLog = () => {
  const [logId, setLogId] = useState('');
  const [mealType, setMealType] = useState('');
  const [logDate, setLogDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedMealLog = await updateMealLog(logId, mealType, logDate);
      console.log('Meal log updated:', updatedMealLog);
      setLogId('');
      setMealType('');
      setLogDate('');
    } catch (error) {
      console.error('Error updating meal log:', error);
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
        placeholder="Meal Type"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
      />
      <input
        type="date"
        value={logDate}
        onChange={(e) => setLogDate(e.target.value)}
      />
      <button type="submit">Update Meal Log</button>
    </form>
  );
};

export default UpdateMealLog;