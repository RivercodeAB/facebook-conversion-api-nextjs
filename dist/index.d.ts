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
export default FBEvent;
