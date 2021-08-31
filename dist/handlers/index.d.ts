import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Facebook Conversion API Event Handler for Next.js.
 *
 * @param req
 * @param res
 * @constructor
 */
declare const FBEventsHandler: (req: NextApiRequest, res: NextApiResponse) => void;
export default FBEventsHandler;
