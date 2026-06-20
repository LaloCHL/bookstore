import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kkofkahyvcjayudskgco.supabase.co'
const supabaseKey = 'sb_publishable_Y9x9jr3Ac2EXrjjMvhTBNg_ID_pnWVC'

export const supabase = createClient(supabaseUrl, supabaseKey)