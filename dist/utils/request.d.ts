import type { NextApiRequest } from 'next';
/**
 * Get client IP address from request.
 *
 * @param req
 */
declare const getClientIpAddress: (req: NextApiRequest) => string;
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
declare const getClientFbp: (req: NextApiRequest) => string;
/**
 * Get client fbc from request query params or cookie.
 *
 * @param req
 */
declare const getClientFbc: (req: NextApiRequest) => string;
export { getClientIpAddress, getClientUserAgent, getClientFbp, getClientFbc, };
