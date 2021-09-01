"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBEvent = void 0;
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
};
exports.FBEvent = FBEvent;
