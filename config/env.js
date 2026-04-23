const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';
const API_TOKEN = __ENV.API_TOKEN || '';
const ENV_NAME = __ENV.ENV_NAME || 'local';

export const env = {
  BASE_URL,
  API_TOKEN,
  ENV_NAME,
};