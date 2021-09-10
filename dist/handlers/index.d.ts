import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
declare const fbEventsHandler: (req: NextApiRequest, res: NextApiResponse) => void;
export { fbEventsHandler };
