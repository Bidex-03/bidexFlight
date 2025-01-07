import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://relpmotuqdkfrzmbdhfj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbHBtb3R1cWRrZnJ6bWJkaGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MTQzODEsImV4cCI6MjA0NDA5MDM4MX0.FacNB8f_gtlD_l3x6CReFAxR29njhZGJhaD9yoxoLZQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
