import type { NextApiRequest } from 'next';
import Cookies from 'universal-cookie'

/**
 * Get client referer URL from request.
 *
 * @param req
 */
const clientRefererUrl = (req: NextApiRequest) => String(req.headers.referer ?? '');

/**
 * Get client IP address from request.
 *
 * @param req
 */
const clientIpAddress = (req: NextApiRequest) => String(req.headers['x-real-ip'] || req.connection.remoteAddress);

/**
 * Get client user agent from request.
 *
 * @param req
 */
const clientUserAgent = (req: NextApiRequest) => String(req.headers['user-agent'] ?? '');

/**
 * Get client FBP from cookie. Return null if cookie is not provided
 * 
 * @param req 
 */
const clientFbpCookie = (req: NextApiRequest): string | null => {
  const cookies = new Cookies(req.headers.cookie)

  if (cookies.get('_fbp')) {
    return cookies.get('_fbp')
  }

  return null
}

/**
 * Return users FBC cookie from fbclid.
 * If fbclid is not provided in req.headers.referer, get value from cookie.
 * else return null
 * 
 * @param req 
 * @returns 
 */
const clientFbcCookie = (req: NextApiRequest): string | null => {
  if (req.headers.referer) {
    const url = new URL(req.headers.referer);

    if (url.searchParams.has('fbclid')) {
      return url.searchParams.get('fbclid') ?? '';
    }
  }

  const cookies = new Cookies(req.headers.cookie)

  if (cookies.get('_fbc')) {
    return cookies.get('_fbc')
  }

  return null
};

export { clientRefererUrl, clientIpAddress, clientUserAgent, clientFbpCookie, clientFbcCookie };
