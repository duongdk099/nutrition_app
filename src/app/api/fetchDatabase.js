// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
    const data = await sql`SELECT * FROM users`;
    return data;
}