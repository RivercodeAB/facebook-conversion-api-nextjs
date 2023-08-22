import { FBEvent } from './types';
declare global {
    interface Window {
        fbq: any;
    }
}
/**
 * Trigger Facebook PageView Event (Standard Pixel).
 *
 * @constructor
 */
declare const fbPageView: () => void;
/**
 * Trigger custom Facebook Event (Conversion API and optionally Standard Pixel).
 *
 * @param event
 * @constructor
 */
declare const fbEvent: (event: FBEvent) => void;
export { fbEvent, fbPageView };
