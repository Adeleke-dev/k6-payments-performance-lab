import { sleep } from 'k6';
import { loadScenario } from '../config/scenarios/load.js';
import { paymentThresholds } from '../config/thresholds/payment.thresholds.js';
import { buildPaymentPayload } from '../src/data/paymentPayloadFactory.js';
import { createPayment } from '../src/clients/paymentApiClient.js';
import { validatePaymentResponse } from '../src/checks/paymentChecks.js';

export const options = {
  stages: loadScenario.stages,
  thresholds: paymentThresholds,
};

export default function () {
  const payload = buildPaymentPayload();
  const response = createPayment(payload);

  validatePaymentResponse(response);

  sleep(1);
}