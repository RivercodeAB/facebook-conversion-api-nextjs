"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientFbc = exports.getClientFbp = exports.getClientUserAgent = exports.getClientIpAddress = exports.getClientRefererUrl = void 0;
const universal_cookie_1 = __importDefault(require("universal-cookie"));
/**
 * Get client referer URL from request.
 *
 * @param req
 */
const getClientRefererUrl = (req) => { var _a; return String((_a = req.headers.referer) !== null && _a !== void 0 ? _a : ''); };
exports.getClientRefererUrl = getClientRefererUrl;
/**
 * Get client IP address from request.
 *
 * @param req
 */
const getClientIpAddress = (req) => String(req.headers['x-real-ip'] || req.connection.remoteAddress);
exports.getClientIpAddress = getClientIpAddress;
/**
 * Get client user agent from request.
 *
 * @param req
 */
const getClientUserAgent = (req) => { var _a; return String((_a = req.headers['user-agent']) !== null && _a !== void 0 ? _a : ''); };
exports.getClientUserAgent = getClientUserAgent;
/**
 * Get client fbp from request cookie.
 *
 * @param req
 */
const getClientFbp = (req) => {
    const cookies = new universal_cookie_1.default(req.headers.cookie);
    if (!cookies.get('_fbp')) {
        return null;
    }
    return cookies.get('_fbp');
};
exports.getClientFbp = getClientFbp;
/**
 * Get client fbc from request query params or cookie.
 *
 * @param req
 */
const getClientFbc = (req) => {
    if (req.headers.referer) {
        const url = new URL(req.headers.referer);
        if (url.searchParams.has('fbclid')) {
            return url.searchParams.get('fbclid');
        }
    }
    const cookies = new universal_cookie_1.default(req.headers.cookie);
    if (cookies.get('_fbc')) {
        return cookies.get('_fbc');
    }
    return null;
};
exports.getClientFbc = getClientFbc;
