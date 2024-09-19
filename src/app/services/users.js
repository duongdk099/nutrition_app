"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const data = await sql`SELECT * FROM users`;
  return data;
}

export async function createUser(username, email, password) {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  
    // Check if the email already exists in the database
    const existingUser = await sql`
      SELECT * FROM users
      WHERE email = ${email}
    `;
  
    if (existingUser.length > 0) {
      // If email is found, throw an error or return a message
      throw new Error("Email is already in use.");
    }
  
    // Insert new user into the database if email is unique
    const newUser = await sql`
      INSERT INTO users (username, email, password_hash)
      VALUES (${username}, ${email}, ${password})
      RETURNING *;
    `;
  
    return newUser;
  }

export async function login(email, password) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const user = await sql`
        SELECT * FROM users
        WHERE email = ${email}
        AND password_hash = ${password}
    `;
  return user;
}

export async function updatePassword(userId, newPassword) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const updatedUser = await sql`
        UPDATE users
        SET password_hash = ${newPassword}
        WHERE user_id = ${userId}
        RETURNING *;
    `;
  return updatedUser;
}

export async function deleteUser(userId) {
  const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
  const deletedUser = await sql`
        DELETE FROM users
        WHERE user_id = ${userId}
        RETURNING *;
    `;
  return deletedUser;
}