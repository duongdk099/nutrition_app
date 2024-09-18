import { neon } from "@neondatabase/serverless";

export async function createMealLogItem(logId, foodItemId, consumedQuantityInGrams) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newMealLogItem = await sql`
        INSERT INTO meal_log_items (meal_log_id, food_id, consumed_quantity_in_grams)
        VALUES (${logId}, ${foodItemId}, ${consumedQuantityInGrams})
        RETURNING *;
    `;
    return newMealLogItem;
}

export async function getMealLogItemsByLog(logId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const mealLogItems = await sql`
        SELECT * FROM meal_log_items WHERE meal_log_id = ${logId};
    `;
    return mealLogItems;
}

export async function updateMealLogItem(itemId, consumedQuantityInGrams) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedMealLogItem = await sql`
        UPDATE meal_log_items
        SET consumed_quantity_in_grams = ${consumedQuantityInGrams}
        WHERE meal_log_item_id = ${itemId}
        RETURNING *;
    `;
    return updatedMealLogItem;
}

export async function deleteMealLogItem(itemId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedMealLogItem = await sql`
        DELETE FROM meal_log_items
        WHERE meal_log_item_id = ${itemId}
        RETURNING *;
    `;
    return deletedMealLogItem;
}