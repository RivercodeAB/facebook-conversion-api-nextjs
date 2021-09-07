import FBEventType from '../types';
import loadFBPixel from './utils/fb-pixel';

declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Init standard Facebook Pixel.
 * @constructor
 */
const FBInit = (): void => {
  if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
    console.log('Missing NEXT_PUBLIC_FACEBOOK_PIXEL_ID in environment file.');
    return;
  }

  loadFBPixel();

  window.fbq('init', process.env.NEXT_PUBLIC_FB_PIXEL_ID);
};

/**
 * Page View event for standard Facebook Pixel.
 * @constructor
 */
const FBPageView = (): void => {
  window.fbq('track', 'PageView');
};

/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @param event
 * @constructor
 */
const FBEvent = (event: FBEventType): void => {
  fetch('/api/fb-events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (event.enableStandardPixel) {
    window.fbq('track', event.eventName, {
      content_type: 'product',
      content_ids: event.products.map((product) => product.sku),
      value: event.value,
      currency: event.currency,
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { FBInit, FBPageView, FBEvent };
