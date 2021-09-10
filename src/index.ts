import FBEventType from '../types';
import debug from './utils/debug';

declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Trigger Facebook PageView Event (Standard Pixel).
 *
 * @constructor
 */
const fbPageView = (): void => {
  debug('Client Side Event: PageView');

  window.fbq('track', 'PageView');
};

/**
 * Trigger custom Facebook Event (Conversion API and optionally Standard Pixel).
 *
 * @param event
 * @constructor
 */
const fbEvent = (event: FBEventType): void => {
  setTimeout(() => {
    if (event.enableStandardPixel) {
      window.fbq('track', event.eventName, {
        content_type: 'product',
        content_ids: event.products.map((product) => product.sku),
        value: event.value,
        currency: event.currency,
      }, (event?.eventId && { eventID: event.eventId }));

      debug(`Client Side Event: ${event.eventName}`);
    }

    fetch('/api/fb-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).then((response) => {
      debug(`Server Side Event: ${event.eventName} (${response.status})`);
    }).catch((error) => {
      debug(`Server Side Event: ${event.eventName} (${error.status})`);
    });
  }, 250);
};

export { fbEvent, fbPageView };
