export async function createFoodItem(name, calories, protein, fat, carbs) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newFoodItem = await sql`
        INSERT INTO food_items (name, calories, protein, fat, carbs)
        VALUES (${name}, ${calories}, ${protein}, ${fat}, ${carbs})
        RETURNING *;
    `;
    return newFoodItem;
}

export async function getAllFoodItems() {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const foodItems = await sql`SELECT * FROM food_items`;
    return foodItems;
}

export async function updateFoodItem(foodItemId, name, calories, protein, fat, carbs) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedFoodItem = await sql`
        UPDATE food_items
        SET name = ${name}, calories = ${calories}, protein = ${protein}, fat = ${fat}, carbs = ${carbs}
        WHERE id = ${foodItemId}
        RETURNING *;
    `;
    return updatedFoodItem;
}

export async function deleteFoodItem(foodItemId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedFoodItem = await sql`
        DELETE FROM food_items
        WHERE id = ${foodItemId}
        RETURNING *;
    `;
    return deletedFoodItem;
}