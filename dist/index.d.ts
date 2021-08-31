import type { NextApiRequest, NextApiResponse } from 'next';
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
declare const FBEvent: (eventName: FBEventRequest['eventName'], products: FBEventRequest['products'], currency: FBEventRequest['currency'], value: FBEventRequest['value'], debug?: boolean) => void;
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
declare const FBEventsHandler: (req: NextApiRequest, res: NextApiResponse) => void;
export { FBEvent, FBEventsHandler };
