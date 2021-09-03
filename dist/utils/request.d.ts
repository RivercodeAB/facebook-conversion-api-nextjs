import type { NextApiRequest } from 'next';
/**
 * Get client referer URL from request.
 *
 * @param req
 */
declare const clientRefererUrl: (req: NextApiRequest) => string;
/**
 * Get client IP address from request.
 *
 * @param req
 */
declare const clientIpAddress: (req: NextApiRequest) => string;
/**
 * Get client user agent from request.
 *
 * @param req
 */
declare const clientUserAgent: (req: NextApiRequest) => string;
/**
 * Get client FBP from cookie. Return null if cookie is not provided
 *
 * @param req
 */
declare const clientFbpCookie: (req: NextApiRequest) => string | null;
/**
 * Return users FBC cookie from fbclid.
 * If fbclid is not provided in req.headers.referer, get value from cookie.
 * else return null
 *
 * @param req
 * @returns
 */
declare const clientFbcCookie: (req: NextApiRequest) => string | null;
export { clientRefererUrl, clientIpAddress, clientUserAgent, clientFbpCookie, clientFbcCookie };
