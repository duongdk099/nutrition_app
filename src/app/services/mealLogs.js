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