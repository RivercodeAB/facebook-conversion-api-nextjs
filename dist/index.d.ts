import FBEventType from '../types';
declare global {
    interface Window {
        fbq: any;
    }
}
/**
 * Init standard Facebook Pixel.
 * @constructor
 */
declare const FBInit: () => void;
/**
 * Page View event for standard Facebook Pixel.
 * @constructor
 */
declare const FBPageView: () => void;
/**
 * Post Facebook Conversion API Event to API endpoint.
 *
 * @param event
 * @constructor
 */
declare const FBEvent: (event: FBEventType) => void;
export { FBInit, FBPageView, FBEvent };
