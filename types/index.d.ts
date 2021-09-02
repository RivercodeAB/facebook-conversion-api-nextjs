type FBEventType = {
  eventName: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  products: [{
    sku: string
    quantity: number
  }]
  value?: number
  currency?: string
  debug: boolean
};

export default FBEventType;
