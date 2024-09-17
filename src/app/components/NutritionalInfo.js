const NutritionalInfo = ({ nutrition }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-medium">Calories</h3>
          <p>{nutrition.calories} kcal</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Protein</h3>
          <p>{nutrition.protein} g</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Carbohydrates</h3>
          <p>{nutrition.carbs} g</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Fiber</h3>
          <p>{nutrition.fiber} g</p>
        </div>
      </div>
    );
  };
  
  export default NutritionalInfo;