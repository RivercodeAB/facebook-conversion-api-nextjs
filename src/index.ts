import type { NextApiRequest, NextApiResponse } from 'next';
import FacebookConversionAPI from '@rivercode/facebook-conversion-api';
import { clientRefererUrl, clientIpAddress, clientUserAgent } from './utils/request';
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

/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
const FBEventsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'This route only accepts POST requests',
    });
  }

  if (!process.env.FB_ACCESS_TOKEN) {
    throw new Error('Missing FB_ACCESS_TOKEN in environment file.');
  }

  if (!process.env.FB_PIXEL_ID) {
    throw new Error('Missing FB_PIXEL_ID in environment file.');
  }

  const {
    eventName,
    emails,
    phones,
    products,
    value,
    currency,
    debug,
  } = req.body as FBEventRequest;

  if (!eventName || !products || products?.length < 1 || !value || !currency) {
    return res.status(400).json({
      error: 'The request body is missing required parameters',
    });
  }

  const FBConversionAPI = new FacebookConversionAPI(
    process.env.FB_ACCESS_TOKEN,
    process.env.FB_PIXEL_ID,
    emails,
    phones,
    clientIpAddress(req),
    clientUserAgent(req),
    '',
    '',
    debug,
  );

  products.forEach((product) => {
    FBConversionAPI.addProduct(product.sku, Number(product.quantity));
  });

  if (['InitiateCheckout', 'Purchase'].includes(eventName)) {
    FBConversionAPI.sendEvent(eventName, clientRefererUrl(req), { currency, value });
  } else {
    FBConversionAPI.sendEvent(eventName, clientRefererUrl(req));
  }

  return res.status(200).json({
    status: 'Success',
  });
};

export { FBEvent, FBEventsHandler };
