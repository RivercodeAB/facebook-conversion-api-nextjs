export declare type Arguments = {
    eventName: string;
    eventId: string;
    emails?: Array<string> | null;
    phones?: Array<string> | null;
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
    firstName?: string;
    lastName?: string;
};
export declare type Response = {
    events_received?: number;
};
