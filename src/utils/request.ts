import type { NextApiRequest } from 'next';
import Cookies from 'universal-cookie';

/**
 * Get client referer URL from request.
 *
 * @param req
 */
const getClientRefererUrl = (req: NextApiRequest) => String(req.headers.referer ?? '');

/**
 * Get client IP address from request.
 *
 * @param req
 */
const getClientIpAddress = (req: NextApiRequest) => {
  const ipAddress = (req.headers['x-real-ip'] || req.connection.remoteAddress);

  if (ipAddress) {
    return String(ipAddress);
  }

  const xForwardedFor = req.headers['x-forwarded-for'] as string ?? '';

  return xForwardedFor.split(',')[0];
};

/**
 * Get client user agent from request.
 *
 * @param req
 */
const getClientUserAgent = (req: NextApiRequest) => String(req.headers['user-agent'] ?? '');

/**
 * Get client fbp from request cookie.
 *
 * @param req
 */
const getClientFbp = (req: NextApiRequest) => {
  const cookies = new Cookies(req.headers.cookie);

  if (!cookies.get('_fbp')) {
    return null;
  }

  return cookies.get('_fbp');
};

/**
 * Get client fbc from request query params or cookie.
 *
 * @param req
 */
const getClientFbc = (req: NextApiRequest) => {
  if (req.headers.referer) {
    const url = new URL(req.headers.referer);

    if (url.searchParams.has('fbclid')) {
      return url.searchParams.get('fbclid');
    }
  }

  const cookies = new Cookies(req.headers.cookie);

  if (cookies.get('_fbc')) {
    return cookies.get('_fbc');
  }

  return null;
};

export {
  getClientRefererUrl,
  getClientIpAddress,
  getClientUserAgent,
  getClientFbp,
  getClientFbc,
};
