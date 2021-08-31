import type { NextApiRequest } from 'next';

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

export { clientRefererUrl, clientIpAddress, clientUserAgent };
