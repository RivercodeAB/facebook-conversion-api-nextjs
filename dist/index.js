"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FBEvent = void 0;
/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @constructor
 * @param eventRequest
 */
const FBEvent = (eventRequest) => {
    fetch('/api/fb-events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventRequest),
    });
};
exports.FBEvent = FBEvent;
