import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const SUPABASE_URL = "https://gyrkrxestxdltxclujhm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5cmtyeGVzdHhkbHR4Y2x1amhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MTE4MjAsImV4cCI6MjA5ODM4NzgyMH0.cneO8EciGx6o54h2RkAd9q7YgSppZc9NEPyU_uWOXOo";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
