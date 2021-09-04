import type { NextApiRequest, NextApiResponse } from 'next';
import FacebookConversionAPI from '@rivercode/facebook-conversion-api';
import {
  getClientRefererUrl,
  getClientIpaddress,
  getClientUserAgent,
  getClientFbp, getClientFbc,
} from '../utils/request';
import FBEventType from '../../types';

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
    eventId,
    emails,
    phones,
    products,
    value,
    currency,
    debug,
  } = req.body as FBEventType;

  if (!eventName || !products || products?.length < 1) {
    return res.status(400).json({
      error: 'The request body is missing required parameters',
    });
  }

  const FBConversionAPI = new FacebookConversionAPI(
    process.env.FB_ACCESS_TOKEN,
    process.env.FB_PIXEL_ID,
    emails ?? null,
    phones ?? null,
    getClientIpaddress(req),
    getClientUserAgent(req),
    getClientFbp(req),
    getClientFbc(req),
    debug,
  );

  products.forEach((product) => {
    FBConversionAPI.addProduct(product.sku, product.quantity);
  });

  FBConversionAPI.sendEvent(eventName, getClientRefererUrl(req), { value, currency }, { eventId });

  return res.status(200).json({
    status: 'Success',
  });
};

// eslint-disable-next-line import/prefer-default-export
export { FBEventsHandler };
