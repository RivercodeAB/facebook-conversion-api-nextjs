"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @param eventName
 * @param products
 * @param currency
 * @param value
 * @param debug
 * @constructor
 */
const FBEvent = (eventName, products, currency, value, debug = false) => {
    fetch('/api/fb-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventName,
            products,
            value,
            currency,
            debug,
        }),
    })
        .then((r) => console.log(r.json()));
};
exports.default = FBEvent;
