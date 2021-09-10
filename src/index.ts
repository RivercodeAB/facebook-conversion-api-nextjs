import FBEventType from '../types';

declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Trigger Facebook PageView Event (Standard Pixel).
 * @constructor
 */
const fbPageView = (): void => {
  window.fbq('track', 'PageView');
};

/**
 * Post Facebook Conversion API Event to API endpoint (API and optionally Standard Pixel).
 *
 * @param event
 * @constructor
 */
const fbEvent = (event: FBEventType): void => {
  if (event.debug) {
    console.log('--------------------------------');
    console.log('Facebook Conversion API');
    console.log('--------------------------------');
  }

  if (event.enableStandardPixel) {
    setTimeout(() => {
      window.fbq('track', event.eventName, {
        content_type: 'product',
        content_ids: event.products.map((product) => product.sku),
        value: event.value,
        currency: event.currency,
      }, (event?.eventId && { eventID: event.eventId }));

      if (event.debug) console.log(`Client Side Event Sent: ${event.eventName}`);
    }, 250);
  }

  fetch('/api/fb-events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((response) => {
    if (event.debug) console.log(`Server Side Event Sent: ${event.eventName} (${response.status})`);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { fbEvent, fbPageView };
