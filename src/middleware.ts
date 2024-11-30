import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from '@/utils/sessions';

export async function middleware(req: NextRequest) {
  const session = await getCookie('session');

  if (session) {
    const headers = new Headers(req.headers);
    headers.set('Authorization', `Bearer ${session}`);

    const modifiedReq = new Request(req.url, {
      headers,
      method: req.method,
      body: req.body,
      redirect: req.redirect,
    });

    return NextResponse.next({
      request: modifiedReq,
    });
  }

  return NextResponse.next();
}
