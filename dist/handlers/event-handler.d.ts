import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
declare const eventHandler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export default eventHandler;
