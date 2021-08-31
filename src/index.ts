import FBEventRequest from '../types';

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
const FBEvent = (
  eventName: FBEventRequest['eventName'], products: FBEventRequest['products'],
  currency: FBEventRequest['currency'], value: FBEventRequest['value'], debug: boolean = false,
) => {
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

export default FBEvent;
