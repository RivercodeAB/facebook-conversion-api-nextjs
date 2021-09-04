import type { NextApiRequest } from 'next';
/**
 * Get client referer URL from request.
 *
 * @param req
 */
declare const getClientRefererUrl: (req: NextApiRequest) => string;
/**
 * Get client IP address from request.
 *
 * @param req
 */
declare const getClientIpaddress: (req: NextApiRequest) => string;
/**
 * Get client user agent from request.
 *
 * @param req
 */
declare const getClientUserAgent: (req: NextApiRequest) => string;
/**
 * Get client fbp from request cookie.
 *
 * @param req
 */
declare const getClientFbp: (req: NextApiRequest) => any;
/**
 * Get client fbc from request query params or cookie.
 *
 * @param req
 */
declare const getClientFbc: (req: NextApiRequest) => any;
export { getClientRefererUrl, getClientIpaddress, getClientUserAgent, getClientFbp, getClientFbc, };
