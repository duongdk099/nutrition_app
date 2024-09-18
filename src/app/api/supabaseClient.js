// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Replace with your Supabase project URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Replace with your Supabase anon public key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;