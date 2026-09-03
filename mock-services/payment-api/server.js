const express = require('express');

const app = express();
app.use(express.json());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post('/payments', async (req, res) => {
  const { amount, currency, customerId } = req.body;

  if (!amount || !currency || !customerId) {
    return res.status(400).json({
      error: 'Invalid payment request',
      code: 'VALIDATION_ERROR',
    });
  }

  const simulatedDelay = Math.floor(Math.random() * 400) + 50;
  await sleep(simulatedDelay);

  const failureRate = Number(process.env.FAILURE_RATE ?? 0);
  const randomFailureChance = Math.random();

  if (randomFailureChance < failureRate) {
    return res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    });
  }

  return res.status(201).json({
    paymentId: `pay_${Date.now()}`,
    status: 'AUTHORIZED',
    amount,
    currency,
    createdAt: new Date().toISOString(),
  });
});

app.listen(3000, () => {
  console.log('Payment API running on http://localhost:3000');
});