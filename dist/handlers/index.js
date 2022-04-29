"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbEventsHandler = void 0;
const facebook_conversion_api_1 = __importDefault(require("@rivercode/facebook-conversion-api"));
const request_1 = require("../utils/request");
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
const fbEventsHandler = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({
            message: 'This route only accepts POST requests',
        });
    }
    if (!process.env.FB_ACCESS_TOKEN) {
        throw new Error('Missing FB_ACCESS_TOKEN in environment file.');
    }
    if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        throw new Error('Missing NEXT_PUBLIC_FB_PIXEL_ID in environment file.');
    }
    const { eventName, eventId, emails, phones, products, value, currency, userAgent, } = req.body;
    if (!eventName || !products || (products === null || products === void 0 ? void 0 : products.length) < 1) {
        return res.status(400).json({
            error: 'The request body is missing required parameters',
        });
    }
    const FBConversionAPI = new facebook_conversion_api_1.default(process.env.FB_ACCESS_TOKEN, process.env.NEXT_PUBLIC_FB_PIXEL_ID, emails !== null && emails !== void 0 ? emails : null, phones !== null && phones !== void 0 ? phones : null, (0, request_1.getClientIpAddress)(req), userAgent, (0, request_1.getClientFbp)(req), (0, request_1.getClientFbc)(req), (process.env.NEXT_PUBLIC_FB_DEBUG === 'true'));
    products.forEach((product) => {
        FBConversionAPI.addProduct(product.sku, product.quantity);
    });
    FBConversionAPI.sendEvent(eventName, (0, request_1.getClientRefererUrl)(req), { value, currency }, { eventId });
    return res.status(200).json({
        status: 'Success',
    });
};
exports.fbEventsHandler = fbEventsHandler;
