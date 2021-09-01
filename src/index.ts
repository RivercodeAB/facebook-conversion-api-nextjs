import FBEventType from '../types';

/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @constructor
 * @param event
 */
const FBEvent = (event: FBEventType) => {
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
