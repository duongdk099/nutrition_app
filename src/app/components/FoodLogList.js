const FoodLogList = ({ foodLogs, onEditFood, onDeleteFood }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Logged Foods</h2>
      <ul className="space-y-4">
        {foodLogs.map((log, index) => (
          <li key={index} className="p-4 border rounded">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{log.name}</h3>
                <p>Meal: {log.mealNumber}</p>
                <p>Time: {log.mealTime}</p>
                <p>Quantity: {log.quantity} g</p>
                <p>Calories: {(log.calories * log.quantity) / 100} kcal</p>
                <p>Protein: {(log.protein * log.quantity) / 100} g</p>
                <p>Fiber: {(log.fiber * log.quantity) / 100} g</p>
                <p>Carbs: {(log.carbs * log.quantity) / 100} g</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => onEditFood(index)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteFood(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodLogList;