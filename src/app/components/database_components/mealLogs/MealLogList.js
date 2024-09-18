// components/MealLogList.js
import { useEffect, useState } from 'react';
import { getMealLogsByUser } from '../../../services/mealLogs'; // Import the function to get meal logs by user

const MealLogList = ({ userId }) => {
  const [mealLogs, setMealLogs] = useState([]);

  useEffect(() => {
    async function fetchMealLogs() {
      try {
        const userMealLogs = await getMealLogsByUser(userId);
        setMealLogs(userMealLogs);
      } catch (error) {
        console.error('Error fetching meal logs:', error);
      }
    }
    fetchMealLogs();
  }, [userId]);

  return (
    <div>
      <h2>Meal Logs for User {userId}</h2>
      <ul>
        {mealLogs.map((log) => (
          <li key={log.id}>{log.meal_type} - {log.log_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealLogList;