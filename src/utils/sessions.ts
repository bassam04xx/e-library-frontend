import 'server-only'
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';


const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  },
  duration: 60 * 60 * 24 * 2, // 2 days
}


export const getCookie = async (name: string) => {
  const cookieStore = cookies();
  const cookieValue = (await cookieStore).get(name);
  return cookieValue ? cookieValue.value : null;
};

export async function createSession(session: string, username: string, userRole: string) {
  const expires = new Date(Date.now() + cookie.duration);
  (await cookies()).set(cookie.name, session, {...cookie.options, expires, sameSite: 'lax' as const});
  (await cookies()).set('username', username, {...cookie.options, expires, sameSite: 'lax' as const});
  (await cookies()).set('userRole', userRole, {...cookie.options, expires, sameSite: 'lax' as const});
  return NextResponse.redirect(new URL('/books', process.env.NEXT_PUBLIC_BACKEND_URL));
}


    export async function deleteCookie(name : string) {
      (await cookies()).delete(name);
}