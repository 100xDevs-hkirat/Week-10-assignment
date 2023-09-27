import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(request: NextRequest) {

    let cookie = request.cookies.get('courseraJWT');

    if (!cookie) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
}

export const config = {
    matcher: ['/addcourse', '/course/:path*'],
};
