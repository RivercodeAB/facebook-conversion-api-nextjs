export type Arguments = {
  eventName: string
  eventId: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  products: {
    sku: string
    quantity: number
  }[]
  value?: number
  currency?: string
  fbp: string
  fbc: string
  ipAddress: string
  userAgent: string
  sourceUrl: string
};

export type Response = {
  events_received?: number
};
