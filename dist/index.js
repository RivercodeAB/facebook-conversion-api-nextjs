"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbPageView = exports.fbEvent = void 0;
const debug_1 = __importDefault(require("./utils/debug"));
/**
 * Trigger Facebook PageView Event (Standard Pixel).
 *
 * @constructor
 */
const fbPageView = () => {
    (0, debug_1.default)('Client Side Event: PageView');
    window.fbq('track', 'PageView');
};
exports.fbPageView = fbPageView;
/**
 * Trigger custom Facebook Event (Conversion API and optionally Standard Pixel).
 *
 * @param event
 * @constructor
 */
const fbEvent = (event) => {
    setTimeout(() => {
        if (event.enableStandardPixel) {
            window.fbq('track', event.eventName, {
                content_type: 'product',
                content_ids: event.products.map((product) => product.sku),
                value: event.value,
                currency: event.currency,
            }, ((event === null || event === void 0 ? void 0 : event.eventId) && { eventID: event.eventId }));
            (0, debug_1.default)(`Client Side Event: ${event.eventName}`);
        }
        fetch('/api/fb-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        }).then((response) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${response.status})`);
        }).catch((error) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${error.status})`);
        });
    }, 250);
};
exports.fbEvent = fbEvent;
