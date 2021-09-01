/**
 * Get client referer URL from request.
 *
 * @param req
 */
const clientRefererUrl = (req) => { var _a; return String((_a = req.headers.referer) !== null && _a !== void 0 ? _a : ''); };
/**
 * Get client IP address from request.
 *
 * @param req
 */
const clientIpAddress = (req) => String(req.headers['x-real-ip'] || req.connection.remoteAddress);
/**
 * Get client user agent from request.
 *
 * @param req
 */
const clientUserAgent = (req) => { var _a; return String((_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : ''); };
export { clientRefererUrl, clientIpAddress, clientUserAgent };
