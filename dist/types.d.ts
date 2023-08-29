export type FBEvent = {
    eventName: string;
    eventId?: string;
    emails?: Array<string> | null;
    phones?: Array<string> | null;
    firstName?: string;
    lastName?: string;
    country?: string;
    city?: string;
    zipCode?: string;
    products?: {
        sku: string;
        quantity: number;
    }[];
    value?: number;
    currency?: string;
    enableStandardPixel?: boolean;
    testEventCode?: string;
};
