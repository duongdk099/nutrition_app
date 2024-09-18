import { neon } from "@neondatabase/serverless";

// Insert a new food item
export async function createFoodItem(name, quantity_in_grams, calories, protein, carbs, fiber) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newFoodItem = await sql`
        INSERT INTO food_items (food_name, quantity_in_grams, calories, protein, carbs, fiber)
        VALUES (${name}, ${quantity_in_grams}, ${calories}, ${protein}, ${carbs}, ${fiber})
        RETURNING *;
    `;
    return newFoodItem;
}

// Fetch all food items
export async function getAllFoodItems() {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const foodItems = await sql`SELECT * FROM food_items`;
    return foodItems;
}

// Update an existing food item
export async function updateFoodItem(foodItemId, name, quantity_in_grams, calories, protein, carbs, fiber) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedFoodItem = await sql`
        UPDATE food_items
        SET food_name = ${name}, quantity_in_grams = ${quantity_in_grams}, calories = ${calories}, 
            protein = ${protein}, carbs = ${carbs}, fiber = ${fiber}
        WHERE food_id = ${foodItemId}
        RETURNING *;
    `;
    return updatedFoodItem;
}

// Delete a food item
export async function deleteFoodItem(foodItemId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedFoodItem = await sql`
        DELETE FROM food_items
        WHERE food_id = ${foodItemId}
        RETURNING *;
    `;
    return deletedFoodItem;
}