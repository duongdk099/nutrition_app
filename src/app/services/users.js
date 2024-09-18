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