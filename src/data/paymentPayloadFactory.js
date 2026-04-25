export function buildPaymentPayload(overrides = {}) {
  const timestamp = Date.now();

  return {
    amount: 2500,
    currency: 'USD',
    customerId: `cust_${timestamp}`,
    paymentMethod: 'card',
    reference: `order_${timestamp}`,
    ...overrides,
  };
}