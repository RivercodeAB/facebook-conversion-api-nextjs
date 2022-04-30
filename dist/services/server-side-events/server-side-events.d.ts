import { Arguments, Response } from './server-side-events.types';
declare const sendServerSideEvent: ({ eventName, eventId, emails, phones, products, value, currency, fbc, fbp, ipAddress, userAgent, sourceUrl, }: Arguments) => Promise<Response>;
export { sendServerSideEvent, };
