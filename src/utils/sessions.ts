import 'server-only'
import { redirect } from "next/navigation";
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

export async function creatSession(session: string) {
  const expires = new Date(Date.now() + cookie.duration);
  (await cookies()).set(cookie.name, session, {...cookie.options, expires, sameSite: 'lax' as const})
  return NextResponse.redirect(new URL('/books', process.env.NEXT_PUBLIC_BACKEND_URL));
}

// export async function verifySession() {
  //   const sessionCookie = (await cookies()).get(cookie.name)?.value; 
  //   const session = await decrypt(sessionCookie);
  //   if (!session?.username){
    //     redirect('/auth/signin');
    //   }
    //   return { username: session.username };
    // }
    
    export async function deleteSession(){
      (await cookies()).delete(cookie.name);
      redirect('/signin');
}