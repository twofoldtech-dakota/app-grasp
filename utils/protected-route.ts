import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { supabase } from './supabase-client'

export default async function ProtectedRoute<T>(
  context: GetServerSidePropsContext,
  redirectTo?: string,
  getProps?: Function,
): Promise<GetServerSidePropsResult<T>> {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (!user) {
    return {
      redirect: {
        destination: redirectTo ?? '/signin',
        permanent: false,
      }
    }
  }

  if (getProps) {
    return {
      props: getProps(),
    }
  }

  return {
    props: {} as T,
  }
}
