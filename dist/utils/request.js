"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientFbc = exports.getClientFbp = exports.getClientUserAgent = exports.getClientIpAddress = void 0;
const universal_cookie_1 = __importDefault(require("universal-cookie"));
/**
 * Get client IP address from request.
 *
 * @param req
 */
const getClientIpAddress = (req) => {
    var _a;
    const ipAddress = (req.headers['x-real-ip'] || req.connection.remoteAddress);
    if (ipAddress) {
        return String(ipAddress);
    }
    const xForwardedFor = (_a = req.headers['x-forwarded-for']) !== null && _a !== void 0 ? _a : '';
    return xForwardedFor.split(',')[0];
};
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
        return '';
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
    return '';
};
exports.getClientFbc = getClientFbc;
