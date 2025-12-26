
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://cbicjzbuopidnsoqmbqa.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaWNqemJ1b3BpZG5zb3FtYnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzIwODksImV4cCI6MjA3OTIwODA4OX0.jW_MwdZk5HomTtaH-l_K2gobzxlZ1DDW4Be9k-Wj7WM";
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;


