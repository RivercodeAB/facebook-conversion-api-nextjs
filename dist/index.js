"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBEvent = exports.FBPageView = exports.FBInit = void 0;
const fb_pixel_1 = __importDefault(require("./utils/fb-pixel"));
/**
 * Init standard Facebook Pixel.
 * @constructor
 */
const FBInit = () => {
    if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
        console.log('Missing NEXT_PUBLIC_FACEBOOK_PIXEL_ID in environment file.');
        return;
    }
    (0, fb_pixel_1.default)();
    window.fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID);
};
exports.FBInit = FBInit;
/**
 * Page View event for standard Facebook Pixel.
 * @constructor
 */
const FBPageView = () => {
    window.fbq('track', 'PageView');
};
exports.FBPageView = FBPageView;
/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @param event
 * @constructor
 */
const FBEvent = (event) => {
    fetch('/api/fb-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (event.enableStandardPixel) {
        window.fbq('track', event.eventName, {
            content_type: 'product',
            content_ids: event.products.map((product) => product.sku),
            value: event.value,
            currency: event.currency,
        });
    }
};
exports.FBEvent = FBEvent;
