const { createHash } = require('crypto');

const sha256Hash = (string: string) => createHash('sha256').update(string).digest('hex');

export {
  // eslint-disable-next-line import/prefer-default-export
  sha256Hash,
};
