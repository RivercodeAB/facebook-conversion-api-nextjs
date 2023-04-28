export type Arguments = {
  eventName: string
  eventId: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  firstName?: string
  lastName?: string
  country?: string
  city?: string
  zipCode?: string
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
  testEventCode?: string
};

export type Response = {
  events_received?: number
};
