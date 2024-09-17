import React from 'react';

const NutritionalInfoPage = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nutritional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Calories</h3>
            <p className="text-3xl font-bold text-green-600">2000</p>
            <p className="text-gray-600 mt-2">Recommended daily intake</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Protein</h3>
            <p className="text-3xl font-bold text-blue-600">50g</p>
            <p className="text-gray-600 mt-2">Essential for muscle growth</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Carbs</h3>
            <p className="text-3xl font-bold text-yellow-600">300g</p>
            <p className="text-gray-600 mt-2">Primary source of energy</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fats</h3>
            <p className="text-3xl font-bold text-red-600">65g</p>
            <p className="text-gray-600 mt-2">Important for hormone production</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionalInfoPage;