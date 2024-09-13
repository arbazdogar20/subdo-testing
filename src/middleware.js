import {NextResponse} from 'next/server';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)'],
};

export async function middleware(req) {
  const url = req.nextUrl;

  let hostname = req.headers.get('host');

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // Remove port if present and replace root domain with empty string
  hostname = hostname.split(':')[0].replace(`.${rootDomain}`, '');

  // Check if the current hostname is equal to the root domain
  const isMainDomain = hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  // Extract subdomain if not a main domain
  const subdomain = isMainDomain ? null : hostname;

  // If it's a main domain, allow the request to proceed
  if (isMainDomain) {
    return NextResponse.next();
  }

  // Handle subdomain logic
  if (subdomain)
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, req.url)
    );

  // If none of the above conditions are met, return a 404 response
  return new NextResponse(null, {status: 404});
}
