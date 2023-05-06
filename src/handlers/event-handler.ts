import type { NextApiRequest, NextApiResponse } from 'next';
import { getClientIpAddress, getClientFbp, getClientFbc } from '../utils/request';
import { sendServerSideEvent } from '../services/server-side-events';

type Arguments = {
  eventName: string
  eventId: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  zipCode?: string
  products: {
    sku: string
    quantity: number
  }[]
  value?: number
  currency?: string
  userAgent: string
  sourceUrl: string
  testEventCode?: string
};

/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
const eventHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    firstName,
    lastName,
    country,
    city,
    zipCode,
    products,
    value,
    currency,
    userAgent,
    sourceUrl,
    testEventCode,
  } = req.body as Arguments;

  if (!eventName) {
    return res.status(400).json({
      error: 'The request body is missing required parameters: eventName',
    });
  }

  const payload = {
    eventName,
    eventId,
    emails,
    phones,
    firstName,
    lastName,
    country,
    city,
    zipCode,
    products,
    value,
    currency,
    fbp: getClientFbp(req),
    fbc: getClientFbc(req),
    ipAddress: getClientIpAddress(req),
    userAgent,
    sourceUrl,
    testEventCode,
  };

  const response = await sendServerSideEvent(payload);

  const success = response?.events_received === 1 ?? false;

  if (process.env.NEXT_PUBLIC_FB_DEBUG === 'true') {
    return res.status(200).json({
      debug: true,
      success,
      payload,
      response,
    });
  }

  return res.status(200).json({
    success,
  });
};

export default eventHandler;
