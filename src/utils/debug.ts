let initialized = false;

/**
 * Log debug messages in console.
 *
 * @param message
 */
export default (message: string | null): void => {
  if (process.env.NEXT_PUBLIC_FB_DEBUG !== 'true') {
    return;
  }

  if (!initialized) {
    console.log('------------------------------------');
    console.log('Facebook Conversion API Debugging');
    console.log('------------------------------------');
  }

  initialized = true;

  if (message) console.log(message);
};
