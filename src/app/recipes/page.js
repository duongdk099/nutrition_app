import React from 'react';

const RecipesPage = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`} alt="Recipe" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Delicious Recipe {item}</h3>
                <p className="text-gray-600 mb-4">A brief description of this amazing recipe that you'll love.</p>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">View Recipe</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesPage;