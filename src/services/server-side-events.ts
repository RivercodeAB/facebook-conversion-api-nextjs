import { FormData } from 'formdata-node';
import graphApi from '../api/graph-api';
import { sha256Hash } from '../utils/hash';

type Arguments = {
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

type Response = {
  events_received?: number
};

/**
 * Send server side event to Facebook Graph API.
 *
 * @param eventName
 * @param eventId
 * @param emails
 * @param phones
 * @param firstName
 * @param lastName
 * @param country
 * @param city
 * @param zipCode
 * @param products
 * @param value
 * @param currency
 * @param fbc
 * @param fbp
 * @param ipAddress
 * @param userAgent
 * @param sourceUrl
 * @param testEventCode
 * @constructor
 */
const sendServerSideEvent = async ({
  eventName,
  eventId,
  emails,
  phones,
  firstName,
  lastName,
  country,
  city,
  zipCode,
  products,
  value,
  currency,
  fbc,
  fbp,
  ipAddress,
  userAgent,
  sourceUrl,
  testEventCode,
}: Arguments): Promise<Response> => {
  const formData = new FormData();

  const unixTimestampInSeconds = Math.floor(Date.now() / 1000);

  const eventData = [{
    event_name: eventName,
    event_time: unixTimestampInSeconds,
    event_id: eventId,
    event_source_url: sourceUrl,
    action_source: 'website',
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      ...(emails && emails?.length > 0 && {
        em: emails.map((email) => (sha256Hash(email))),
      }),
      ...(phones && phones?.length > 0 && {
        ph: phones.map((phone) => (sha256Hash(phone))),
      }),
      ...(firstName && {
        fn: (sha256Hash(firstName)),
      }),
      ...(lastName && {
        ln: (sha256Hash(lastName)),
      }),
      ...(country && {
        country: (sha256Hash(country)),
      }),
      ...(city && {
        ct: (sha256Hash(city)),
      }),
      ...(zipCode && {
        zp: (sha256Hash(zipCode)),
      }),
      fbc,
      fbp,
    },
    ...(products && products.length > 0) && {
      content_type: 'product',
      contents: products.map((product) => (
        {
          id: product.sku,
          quantity: product.quantity,
        }
      )),
    },
    custom_data: {
      ...(value && { value }),
      ...(currency && { currency }),
    },
  }];

  formData.append('data', JSON.stringify(eventData));

  if (testEventCode) {
    formData.append('test_event_code', testEventCode);
  }

  formData.append('access_token', process.env.FB_ACCESS_TOKEN ?? '');

  return graphApi({
    endpoint: 'events',
    body: formData,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sendServerSideEvent,
};
