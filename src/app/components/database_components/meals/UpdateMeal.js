import { useState } from "react";
import { updateMeal } from "../../../services/meals";

const UpdateMeal = () => {
  const [mealId, setMealId] = useState("");
  const [mealNumber, setMealNumber] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [logDate, setLogDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const updatedMeal = await updateMeal(mealId, mealNumber, mealTime, logDate);
      console.log("Meal updated:", updatedMeal);
      setSuccess("Meal updated successfully!");
      setMealId("");
      setMealNumber("");
      setMealTime("");
      setLogDate("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meal ID"
          value={mealId}
          onChange={(e) => setMealId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Meal Number"
          value={mealNumber}
          onChange={(e) => setMealNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Meal Time"
          value={mealTime}
          onChange={(e) => setMealTime(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Log Date"
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          required
        />
        <button type="submit">Update Meal</button>
      </form>
    </div>
  );
};

export default UpdateMeal;