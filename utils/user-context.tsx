import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactChild,
} from 'react'
import {
  Session,
  User,
} from '@supabase/gotrue-js'
import { postData } from './http-helpers'
import { supabase } from './supabase-client'
import { UserDetails } from '@/types/user-details';
import { Subscription } from '@/types/subscription';
import { useRouter } from 'next/router';
import axios from 'axios';

export const UserContext = createContext<{
  session: Session | null,
  user: User | null,
  userDetails: UserDetails | null,
  subscription: Subscription | null,
}>(null);

export function UserContextProvider(props: { children: ReactChild }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const router = useRouter();
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      await postData('/api/auth', { event, session })
      setSession(session)
      setUser(session?.user ?? null)
    });

    // Navigate to reset-password page
    if (router.asPath.indexOf('type=recovery') > -1) {
      router.push('/reset-password')
    }

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      supabase.from('user_details')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(response => setUserDetails(response.data));

      // fetch subscription after auth cookie is set
      if (session) {
        axios
          .get('/api/get-subscription', { withCredentials: true })
          .then(res => setSubscription(res.data.subscription))
          .catch(() => setSubscription(null));
      }
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export function useUser(): User {
  const context = useContext(UserContext);
  return context.user;
}

export function useUserDetails(): UserDetails {
  const context = useContext(UserContext);
  return context.userDetails;
}

export function useSession(): Session {
  const context = useContext(UserContext);
  return context.session;
}

export function useSubscription(): Subscription {
  const context = useContext(UserContext);
  return context.subscription;
}
