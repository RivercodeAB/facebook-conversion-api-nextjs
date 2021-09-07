Facebook Conversion API for Next.js

> Next.js wrapper for [Facebook's Conversion API](https://developers.facebook.com/docs/marketing-api/conversions-api/)

## Install

```bash
npm install @rivercode/facebook-conversion-api-nextjs
```

## 1. Create Next.js API Route
pages/api/fb-events.js
```jsx
import { FBEventsHandler } from '@rivercode/facebook-conversion-api-nextjs/handlers';

export default FBEventsHandler;
```

### Add Facebook Access Token and Pixel ID
.env
```dotenv
FB_ACCESS_TOKEN=accessToken
FB_PIXEL_ID=pixelID
```

Read more here on how you can get your [access token](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/#access-token) and [pixel id](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).

## 2. Init Facebook Pixel (Optional)
This is only needed if you want to fire standard Pixel Events.
```jsx
import { FBInit, FBPageView } from '@rivercode/facebook-conversion-api-nextjs';

// First page load
useEffect(() => {
  FBInit();
  
  // This prevent the pixel from firing multiple times
  // when the url contains query parameters
  if (!router.asPath.includes('?')) {
    FBPageView();
  }
}, []);

// Listen for route changes
useEffect(() => {
  router.events.on('routeChangeComplete', FBPageView());
  return () => {
    router.events.off('routeChangeComplete', FBPageView());
  }
}, [router.events]);
```

## 3. Start Sending Events
```jsx
import { FBEvent } from '@rivercode/facebook-conversion-api-nextjs';

FBEvent({
  eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout or Purchase
  eventId: 'eventId', // optional
  emails: ['email1', 'email2'], // optional
  phones: ['phone1', 'phone2'], // optional
  products: [{
    sku: 'product123',
    quantity: 1,
  }],
  value: 1000,
  currency: 'USD',
  enablePixelEvents: true, // default false (Require Facebook Pixel to be loaded, see step 2)
  debug: true // default false
});
```
