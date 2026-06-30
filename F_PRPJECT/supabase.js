import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const SUPABASE_URL = "https://rzryyiugvxnvvlafacuk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6cnl5aXVndnhudnZsYWZhY3VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODI2NjIsImV4cCI6MjA5NTM1ODY2Mn0.SgQBL1_4yTcA4jBXh5vFPKWXrazSWK-FZE51BGf-XN8";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
