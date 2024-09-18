export async function createMealLogItem(logId, foodItemId, quantity) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newMealLogItem = await sql`
        INSERT INTO meal_log_items (log_id, food_item_id, quantity)
        VALUES (${logId}, ${foodItemId}, ${quantity})
        RETURNING *;
    `;
    return newMealLogItem;
}

export async function getMealLogItemsByLog(logId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const mealLogItems = await sql`
        SELECT * FROM meal_log_items WHERE log_id = ${logId};
    `;
    return mealLogItems;
}

export async function updateMealLogItem(itemId, quantity) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedMealLogItem = await sql`
        UPDATE meal_log_items
        SET quantity = ${quantity}
        WHERE id = ${itemId}
        RETURNING *;
    `;
    return updatedMealLogItem;
}

export async function deleteMealLogItem(itemId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedMealLogItem = await sql`
        DELETE FROM meal_log_items
        WHERE id = ${itemId}
        RETURNING *;
    `;
    return deletedMealLogItem;
}