import type { NextApiRequest, NextApiResponse } from 'next';
import FacebookConversionAPI from '@rivercode/facebook-conversion-api';
import {
  getClientRefererUrl,
  getClientIpAddress,
  getClientFbp,
  getClientFbc,
} from '../utils/request';
import FBEventType from '../../types';

/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
const fbEventsHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'This route only accepts POST requests',
    });
  }

  if (!process.env.FB_ACCESS_TOKEN) {
    throw new Error('Missing FB_ACCESS_TOKEN in environment file.');
  }

  if (!process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
    throw new Error('Missing NEXT_PUBLIC_FB_PIXEL_ID in environment file.');
  }

  const {
    eventName,
    eventId,
    emails,
    phones,
    products,
    value,
    currency,
    userAgent,
  } = req.body as FBEventType;

  if (!eventName || !products || products?.length < 1) {
    return res.status(400).json({
      error: 'The request body is missing required parameters',
    });
  }

  const FBConversionAPI = new FacebookConversionAPI(
    process.env.FB_ACCESS_TOKEN,
    process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    emails ?? null,
    phones ?? null,
    getClientIpAddress(req),
    userAgent,
    getClientFbp(req),
    getClientFbc(req),
    (process.env.NEXT_PUBLIC_FB_DEBUG === 'true'),
  );

  products.forEach((product) => {
    FBConversionAPI.addProduct(product.sku, product.quantity);
  });

  FBConversionAPI.sendEvent(eventName, getClientRefererUrl(req), { value, currency }, { eventId });

  if (process.env.NEXT_PUBLIC_FB_DEBUG === 'true') {
    return res.status(200).json({
      debug: {
        ipAddress: getClientIpAddress(req),
        userAgent,
        refererUrl: getClientRefererUrl(req),
        fbp: getClientFbp(req),
        fbc: getClientFbc(req),
        eventName,
        products,
        value,
        currency,
        eventId,
      },
    });
  }

  return res.status(200).json({
    status: 'Success',
  });
};

// eslint-disable-next-line import/prefer-default-export
export { fbEventsHandler };
