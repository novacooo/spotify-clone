import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const middleware = async (req: any) => {
  // Token will exist is user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET as string });

  // Actual pathname
  const { pathname } = req.nextUrl.clone();

  // Redirect user to the main page when token exists
  if (token && pathname === '/login') {
    return NextResponse.redirect('/');
  }

  // Allow the request if the following is true:
  // 1. It is a request from next-auth session & provider fetching
  // 2. The token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect user to the login page when token does not exists
  // and user is requesting from protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }

  return null;
};
