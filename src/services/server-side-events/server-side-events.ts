import FormData from 'form-data';
import graphApi from '../../api/graph';
import { Arguments, Response } from './server-side-events.types';

/**
 * Send server side event to Facebook Graph API.
 *
 * @param eventName
 * @param eventId
 * @param emails
 * @param phones
 * @param products
 * @param value
 * @param currency
 * @param fbc
 * @param fbp
 * @param ipAddress
 * @param userAgent
 * @param sourceUrl
 * @constructor
 */
const sendServerSideEvent = async ({
  eventName,
  eventId,
  emails,
  phones,
  products,
  value,
  currency,
  fbc,
  fbp,
  ipAddress,
  userAgent,
  sourceUrl,
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
      ...(emails && emails?.length > 0 && { em: emails }),
      ...(phones && phones?.length > 0 && { ph: phones }),
      fbc,
      fbp,
    },
    contents: products.map((product) => (
      { id: product.sku, quantity: product.quantity }
    )),
    custom_data: {
      ...(value && { value }),
      ...(currency && { currency }),
    },
  }];

  formData.append('data', JSON.stringify(eventData));
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
