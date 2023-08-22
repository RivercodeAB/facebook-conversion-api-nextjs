type Arguments = {
    eventName: string;
    eventId: string;
    emails?: Array<string> | null;
    phones?: Array<string> | null;
    firstName?: string;
    lastName?: string;
    country?: string;
    city?: string;
    zipCode?: string;
    products: {
        sku: string;
        quantity: number;
    }[];
    value?: number;
    currency?: string;
    fbp: string;
    fbc: string;
    ipAddress: string;
    userAgent: string;
    sourceUrl: string;
    testEventCode?: string;
};
type Response = {
    events_received?: number;
};
/**
 * Send server side event to Facebook Graph API.
 *
 * @param eventName
 * @param eventId
 * @param emails
 * @param phones
 * @param firstName
 * @param lastName
 * @param country
 * @param city
 * @param zipCode
 * @param products
 * @param value
 * @param currency
 * @param fbc
 * @param fbp
 * @param ipAddress
 * @param userAgent
 * @param sourceUrl
 * @param testEventCode
 * @constructor
 */
declare const sendServerSideEvent: ({ eventName, eventId, emails, phones, firstName, lastName, country, city, zipCode, products, value, currency, fbc, fbp, ipAddress, userAgent, sourceUrl, testEventCode, }: Arguments) => Promise<Response>;
export { sendServerSideEvent, };
