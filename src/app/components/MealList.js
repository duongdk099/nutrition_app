import MealItem from './MealItem';

const MealList = ({ meals, handleEditMeal, handleDeleteMeal }) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">What We Ate</th>
          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Meal Number</th>
          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nutrition</th>
          <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
        </tr>
      </thead>
      <tbody>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            handleEditMeal={handleEditMeal}
            handleDeleteMeal={handleDeleteMeal}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MealList;