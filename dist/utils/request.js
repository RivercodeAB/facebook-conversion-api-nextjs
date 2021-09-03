"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientFbcCookie = exports.clientFbpCookie = exports.clientUserAgent = exports.clientIpAddress = exports.clientRefererUrl = void 0;
const universal_cookie_1 = __importDefault(require("universal-cookie"));
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
/**
 * Get client FBP from cookie. Return null if cookie is not provided
 *
 * @param req
 */
const clientFbpCookie = (req) => {
    const cookies = new universal_cookie_1.default(req.headers.cookie);
    if (cookies.get('_fbp')) {
        return cookies.get('_fbp');
    }
    return null;
};
exports.clientFbpCookie = clientFbpCookie;
/**
 * Return users FBC cookie from fbclid.
 * If fbclid is not provided in req.headers.referer, get value from cookie.
 * else return null
 *
 * @param req
 * @returns
 */
const clientFbcCookie = (req) => {
    var _a;
    if (req.headers.referer) {
        const url = new URL(req.headers.referer);
        if (url.searchParams.has('fbclid')) {
            return (_a = url.searchParams.get('fbclid')) !== null && _a !== void 0 ? _a : '';
        }
    }
    const cookies = new universal_cookie_1.default(req.headers.cookie);
    if (cookies.get('_fbc')) {
        return cookies.get('_fbc');
    }
    return null;
};
exports.clientFbcCookie = clientFbcCookie;
