const MealItem = ({ meal, handleEditMeal, handleDeleteMeal }) => {
    return (
      <tr className="border-b">
        {/* What We Ate */}
        <td className="px-6 py-4">
          <ul>
            {meal.whatWeAte.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.quantity} {item.unit} ({item.type === 'recipe' ? 'Recipe' : 'Manual'})
              </li>
            ))}
          </ul>
        </td>
  
        {/* Meal Number and Time */}
        <td className="px-6 py-4">
          <p>Meal {meal.mealNumber}</p>
          <p>{meal.time}</p>
        </td>
  
        {/* Nutrition Info */}
        <td className="px-6 py-4">
          <p>Calories: {meal.nutrition.calories} kcal</p>
          <p>Protein: {meal.nutrition.protein} g</p>
          <p>Carbs: {meal.nutrition.carbs} g</p>
          <p>Fiber: {meal.nutrition.fiber} g</p>
        </td>
  
        {/* Actions (Edit and Delete) */}
        <td className="px-6 py-4">
          <div className="flex space-x-4">
            <button onClick={() => handleEditMeal(meal.id)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Edit</button>
            <button onClick={() => handleDeleteMeal(meal.id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
          </div>
        </td>
      </tr>
    );
  };
  
  export default MealItem;