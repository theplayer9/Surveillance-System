import { createClient } from '@supabase/supabase-js'


const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL


// Create a single supabase client for interacting with your database 
const supabase = createClient(supabaseKey,supabaseUrl)

export default supabase;