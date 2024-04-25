import { createClient } from '@supabase/supabase-js'
import { SiEdgeimpulse } from 'react-icons/si';
export const supabaseUrl = 'https://ulhwjxliihwdmgrxhuaj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsaHdqeGxpaWh3ZG1ncnhodWFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MDAzNzksImV4cCI6MjAyOTQ3NjM3OX0.nIrUF35IAP9k3wmaNmOangp-TVEyVZgtXeT7FYXqKlw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

