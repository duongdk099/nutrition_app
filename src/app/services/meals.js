import { neon } from '@neondatabase/serverless';

// Create a new meal
export async function createMeal(user_id, meal_number, meal_time, log_date) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newMeal = await sql`
        INSERT INTO meals (user_id, meal_number, meal_time, log_date)
        VALUES (${user_id}, ${meal_number}, ${meal_time}, ${log_date})
        RETURNING *;
    `;
    return newMeal;
}

// Read (Get) meals by user_id
export async function getMealsByUser(user_id) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const meals = await sql`
        SELECT * FROM meals
        WHERE user_id = ${user_id};
    `;
    return meals;
}

// Read (Get) a specific meal by meal_id
export async function getMealById(meal_id) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const meal = await sql`
        SELECT * FROM meals
        WHERE meal_id = ${meal_id};
    `;
    return meal;
}

// Update a meal
export async function updateMeal(meal_id, meal_number, meal_time, log_date) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedMeal = await sql`
        UPDATE meals
        SET meal_number = ${meal_number}, meal_time = ${meal_time}, log_date = ${log_date}
        WHERE meal_id = ${meal_id}
        RETURNING *;
    `;
    return updatedMeal;
}

// Delete a meal
export async function deleteMeal(meal_id) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedMeal = await sql`
        DELETE FROM meals
        WHERE meal_id = ${meal_id}
        RETURNING *;
    `;
    return deletedMeal;
}