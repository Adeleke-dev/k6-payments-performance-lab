import { check } from 'k6';

export function validatePaymentResponse(response) {
  let responseBody = {};

  try {
    responseBody = response.json();
  } catch (error) {
    responseBody = {};
  }

  const isSuccessStatus = response.status === 200 || response.status === 201;
  const isServerError = response.status >= 500;

  return check(response, {
    'status is 201 or 200': () => isSuccessStatus,
    'response has paymentId': () => isSuccessStatus && Boolean(responseBody.paymentId),
    'response has status': () => isSuccessStatus && Boolean(responseBody.status),
    'status is AUTHORIZED or SUCCESS': () =>
      isSuccessStatus &&
      (responseBody.status === 'AUTHORIZED' || responseBody.status === 'SUCCESS'),
    'server error rate is visible when present': () => !isServerError || response.status === 500,
  });
}