import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabase-client'

export default function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}
