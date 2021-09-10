Facebook Conversion API for Next.js

> Next.js wrapper for [Facebook's Conversion API](https://developers.facebook.com/docs/marketing-api/conversions-api/)

## Install

```bash
npm install @rivercode/facebook-conversion-api-nextjs
```

## 1. Create Next.js API Route
pages/api/fb-events.js
```jsx
import { fbEventsHandler } from '@rivercode/facebook-conversion-api-nextjs/handlers';

export default fbEventsHandler;
```

### Add Facebook Access Token and Pixel ID
.env
```dotenv
FB_ACCESS_TOKEN=accessToken
NEXT_PUBLIC_FB_PIXEL_ID=pixelID
```

Read more here on how you can get your [access token](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/#access-token) and [pixel id](https://www.facebook.com/business/help/952192354843755?id=1205376682832142).

## 2. Load Facebook Pixel (Optional)
This is only needed if you want to fire standard Pixel Events.

### Add Facebook Pixel Script
pages/_document.js
```jsx
import { FBPixelScript } from '@rivercode/facebook-conversion-api-nextjs/components';

<Head>
  <FBPixelScript />
</Head>
```

### Add Facebook Pixel Wrapper
pages/_app.js
```jsx
import { FBPixelWrapper } from '@rivercode/facebook-conversion-api-nextjs/components';

<FBPixelWrapper>
  <Component {...pageProps} />
</FBPixelWrapper>
```

## 3. Start Sending Events
```jsx
import { fbEvent } from '@rivercode/facebook-conversion-api-nextjs';

fbEvent({
  eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout or Purchase
  eventId: 'eventId', // optional
  emails: ['email1', 'email2'], // optional
  phones: ['phone1', 'phone2'], // optional
  products: [{
    sku: 'product123',
    quantity: 1,
  }],
  value: 1000, // optional
  currency: 'USD', // optional
  enableStandardPixel: true, // default false (Require Facebook Pixel to be loaded, see step 2)
  debug: true // default false
});
```
