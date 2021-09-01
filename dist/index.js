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
// eslint-disable-next-line import/prefer-default-export
export { FBEvent };
