import { sleep } from 'k6';
import { stressScenario } from '../config/scenarios/stress.js';
import { stressThresholds } from '../config/thresholds/stress.thresholds.js';
import { buildPaymentPayload } from '../src/data/paymentPayloadFactory.js';
import { createPayment } from '../src/clients/paymentApiClient.js';
import { validatePaymentResponse } from '../src/checks/paymentChecks.js';

export const options = {
  stages: stressScenario.stages,
  thresholds: stressThresholds,
};

export default function () {
  const payload = buildPaymentPayload();
  const response = createPayment(payload);

  validatePaymentResponse(response);

  sleep(1);
}