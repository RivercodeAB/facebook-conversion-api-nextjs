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
export { clientRefererUrl, clientIpAddress, clientUserAgent };
