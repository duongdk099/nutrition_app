import React from 'react';

const HomePage = () => (
  <>
    {/* Hero Section */}
    <section 
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to NutriLife</h1>
          <p className="text-xl text-white">Your journey to a healthier you starts here</p>
        </div>
      </div>
    </section>

    {/* Featured Recipe */}
    <section className="bg-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Recipe</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto md:flex">
          <img className="h-48 w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt="Featured Recipe" />
          <div className="p-8">
            <h3 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Healthy Salad Bowl</h3>
            <p className="mt-2 text-gray-500">A delicious and nutritious salad packed with fresh vegetables, lean protein, and a zesty dressing.</p>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">View Recipe</button>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { text: '"NutriLife has completely transformed my eating habits. I feel healthier and more energetic than ever!"', name: "Sarah J." },
            { text: '"The meal plans are fantastic! They\'ve made it so easy for me to stick to my diet goals."', name: "Mike R." },
            { text: '"I love the variety of recipes. There\'s always something new and exciting to try!"', name: "Emily L." }
          ].map(({ text, name }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">{text}</p>
              <p className="font-semibold">- {name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default HomePage;