import { sleep } from 'k6';
import { smokeScenario } from '../config/scenarios/smoke.js';
import { smokeThresholds } from '../config/thresholds/smoke.thresholds.js';
import { buildPaymentPayload } from '../src/data/paymentPayloadFactory.js';
import { createPayment } from '../src/clients/paymentApiClient.js';
import { validatePaymentResponse } from '../src/checks/paymentChecks.js';

export const options = {
  vus: smokeScenario.vus,
  duration: smokeScenario.duration,
  thresholds: smokeThresholds,
};

export default function () {
  const payload = buildPaymentPayload();
  const response = createPayment(payload);

  validatePaymentResponse(response);

  sleep(1);
}