// components/DeleteMealLog.js
import { useState } from 'react';
import { deleteMealLog } from '../../../services/mealLogs'; // Import the function to delete the meal log

const DeleteMealLog = () => {
  const [logId, setLogId] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteMealLog(logId);
      console.log(`Meal log ${logId} deleted`);
      setLogId('');
    } catch (error) {
      console.error('Error deleting meal log:', error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="text"
        placeholder="Log ID"
        value={logId}
        onChange={(e) => setLogId(e.target.value)}
      />
      <button type="submit">Delete Meal Log</button>
    </form>
  );
};

export default DeleteMealLog;