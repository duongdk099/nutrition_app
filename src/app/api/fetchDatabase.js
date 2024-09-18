// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const data = await sql`SELECT * FROM users`;
  return data;
}

export async function createUser(username, email, password ) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const newUser = await sql`
        INSERT INTO users (username, email, password)
        VALUES (${username}, ${email}, ${password})
        RETURNING *;
    `;
  return newUser;
}

export async function updatePassword(userId, newPassword) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const updatedUser = await sql`
        UPDATE users
        SET password = ${newPassword}
        WHERE id = ${userId}
        RETURNING *;
    `;
  return updatedUser;
}

export async function deleteUser(userId) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const deletedUser = await sql`
        DELETE FROM users
        WHERE id = ${userId}
        RETURNING *;
    `;
  return deletedUser;
}


// food_items

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

// meal_logs
export async function createMealLog(userId, mealType, logDate) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newMealLog = await sql`
        INSERT INTO meal_logs (user_id, meal_type, log_date)
        VALUES (${userId}, ${mealType}, ${logDate})
        RETURNING *;
    `;
    return newMealLog;
}

export async function getMealLogsByUser(userId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const mealLogs = await sql`
        SELECT * FROM meal_logs WHERE user_id = ${userId};
    `;
    return mealLogs;
}

export async function updateMealLog(logId, mealType, logDate) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedMealLog = await sql`
        UPDATE meal_logs
        SET meal_type = ${mealType}, log_date = ${logDate}
        WHERE id = ${logId}
        RETURNING *;
    `;
    return updatedMealLog;
}

export async function deleteMealLog(logId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedMealLog = await sql`
        DELETE FROM meal_logs
        WHERE id = ${logId}
        RETURNING *;
    `;
    return deletedMealLog;
}

// meal_log_items

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