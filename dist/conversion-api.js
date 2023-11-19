"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbPageView = exports.fbEvent = void 0;
const uuid_1 = require("uuid");
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
    const eventId = event.eventId ? event.eventId : (0, uuid_1.v4)();
    if (event.enableStandardPixel) {
        const clientSidePayload = Object.assign(Object.assign(Object.assign({}, ((event === null || event === void 0 ? void 0 : event.products) && event.products.length > 0) && {
            content_type: 'product',
            contents: event.products.map((product) => ({
                id: product.sku,
                quantity: product.quantity,
            })),
        }), (event.value && { value: event.value })), (event.currency && { currency: event.currency }));
        window.fbq('track', event.eventName, clientSidePayload, { eventID: eventId });
        (0, debug_1.default)(`Client Side Event: ${event.eventName}`);
        (0, debug_1.default)(`Client Side Payload: ${JSON.stringify(clientSidePayload)}`);
        (0, debug_1.default)(`Client Side Event ID: ${eventId}`);
    }
    setTimeout(() => {
        const serverSidePayload = JSON.stringify({
            eventName: event.eventName,
            eventId,
            emails: event.emails,
            phones: event.phones,
            firstName: event.firstName,
            lastName: event.lastName,
            country: event.country,
            city: event.city,
            zipCode: event.zipCode,
            products: event.products,
            value: event.value,
            currency: event.currency,
            userAgent: navigator.userAgent,
            sourceUrl: window.location.href,
            testEventCode: event.testEventCode,
        });
        fetch('/api/fb-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: serverSidePayload,
        }).then((response) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${response.status})`);
            (0, debug_1.default)(`Server Side Payload: ${serverSidePayload}`);
        }).catch((error) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${error.status})`);
        });
    }, 250);
};
exports.fbEvent = fbEvent;
