import { neon } from "@neondatabase/serverless";

export async function createMealLog(userId, mealNumber, logDate, mealTime) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const newMealLog = await sql`
        INSERT INTO meal_logs (user_id, meal_number, log_date, meal_time)
        VALUES (${userId}, ${mealNumber}, ${logDate}, ${mealTime})
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

export async function updateMealLog(logId, mealNumber, logDate, mealTime) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const updatedMealLog = await sql`
        UPDATE meal_logs
        SET meal_number = ${mealNumber}, log_date = ${logDate}, meal_time = ${mealTime}
        WHERE meal_log_id = ${logId}
        RETURNING *;
    `;
    return updatedMealLog;
}

export async function deleteMealLog(logId) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const deletedMealLog = await sql`
        DELETE FROM meal_logs
        WHERE meal_log_id = ${logId}
        RETURNING *;
    `;
    return deletedMealLog;
}