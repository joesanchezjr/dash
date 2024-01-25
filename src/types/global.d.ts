import { Database as DB } from './database.types'

// declaring globally so we don't have to import it everywhere
declare global {
  type Database = DB
  type Profile = DB['public']['Tables']['profiles']['Row']
}
