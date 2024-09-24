import React, { useState } from 'react';
import { useBackOfficeLogic } from './BackOfficeLogic';

const BackOffice = () => {
  const {
    users,
    meals,
    mealItems,
    newUser,
    newMeal,
    newMealItem,
    setNewUser,
    setNewMeal,
    setNewMealItem,
    handleUpdateUser,
    handleDeleteUser,
    handleCreateMeal,
    handleUpdateMeal,
    handleDeleteMeal,
    handleCreateMealItem,
    handleUpdateMealItem,
    handleDeleteMealItem,
  } = useBackOfficeLogic();

  const [dataView, setDataView] = useState('users'); // State to track which data to display
  const [editingUser, setEditingUser] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);
  const [editingMealItem, setEditingMealItem] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderTable = () => {
    switch (dataView) {
      case 'users':
        return (
          <table className="min-w-full bg-white shadow-lg rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6">User ID</th>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center border-b">{user.user_id}</td>
                  <td className="py-3 px-6 text-center border-b">{user.username}</td>
                  <td className="py-3 px-6 text-center border-b">{user.email}</td>
                  <td className="py-3 px-6 text-center border-b">
                    <button onClick={() => setEditingUser(user)} className="bg-yellow-400 text-white px-3 py-1 rounded-md mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user.user_id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'meals':
        return (
          <table className="min-w-full bg-white shadow-lg rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6">Meal ID</th>
                <th className="py-3 px-6">User ID</th>
                <th className="py-3 px-6">Meal Number</th>
                <th className="py-3 px-6">Meal Time</th>
                <th className="py-3 px-6">Log Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.meal_id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center border-b">{meal.meal_id}</td>
                  <td className="py-3 px-6 text-center border-b">{meal.user_id}</td>
                  <td className="py-3 px-6 text-center border-b">{meal.meal_number}</td>
                  <td className="py-3 px-6 text-center border-b">{meal.meal_time}</td>
                  <td className="py-3 px-6 text-center border-b">{formatDate(meal.log_date)}</td>
                  <td className="py-3 px-6 text-center border-b">
                    <button onClick={() => setEditingMeal(meal)} className="bg-yellow-400 text-white px-3 py-1 rounded-md mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteMeal(meal.meal_id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'mealItems':
        return (
          <table className="min-w-full bg-white shadow-lg rounded-md">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6">Meal Item ID</th>
                <th className="py-3 px-6">Meal ID</th>
                <th className="py-3 px-6">Food Name</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Calories</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealItems.map((mealItem) => (
                <tr key={mealItem.meal_item_id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center border-b">{mealItem.meal_item_id}</td>
                  <td className="py-3 px-6 text-center border-b">{mealItem.meal_id}</td>
                  <td className="py-3 px-6 text-center border-b">{mealItem.food_name}</td>
                  <td className="py-3 px-6 text-center border-b">{mealItem.food_quantity}g</td>
                  <td className="py-3 px-6 text-center border-b">{mealItem.food_calories}</td>
                  <td className="py-3 px-6 text-center border-b">
                    <button onClick={() => setEditingMealItem(mealItem)} className="bg-yellow-400 text-white px-3 py-1 rounded-md mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteMealItem(mealItem.meal_item_id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Back Office</h1>

      {/* Data Overview Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Data Overview</h2>

        {/* Dropdown to select data type */}
        <div className="mb-4">
          <select
            value={dataView}
            onChange={(e) => setDataView(e.target.value)}
            className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          >
            <option value="users">Users</option>
            <option value="meals">Meals</option>
            <option value="mealItems">Meal Items</option>
          </select>
        </div>

        {/* Render the selected table */}
        <div className="overflow-x-auto">{renderTable()}</div>
      </section>
    </div>
  );
};

export default BackOffice;