"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientUserAgent = exports.clientIpAddress = exports.clientRefererUrl = void 0;
/**
 * Get client referer URL from request.
 *
 * @param req
 */
const clientRefererUrl = (req) => { var _a; return String((_a = req.headers.referer) !== null && _a !== void 0 ? _a : ''); };
exports.clientRefererUrl = clientRefererUrl;
/**
 * Get client IP address from request.
 *
 * @param req
 */
const clientIpAddress = (req) => String(req.headers['x-real-ip'] || req.connection.remoteAddress);
exports.clientIpAddress = clientIpAddress;
/**
 * Get client user agent from request.
 *
 * @param req
 */
const clientUserAgent = (req) => { var _a; return String((_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : ''); };
exports.clientUserAgent = clientUserAgent;
