type FBEventRequest = {
  eventName: string
  emails: Array<string> | null
  phones: Array<string> | null
  products: [{
    sku: string
    quantity: number
  }]
  currency: string
  value: number
  debug: boolean
};

export default FBEventRequest;
