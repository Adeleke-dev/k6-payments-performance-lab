# Payment Endpoint Model

## Endpoint
POST /payments

## Example request
```json
{
  "amount": 2500,
  "currency": "USD",
  "customerId": "cust_001",
  "paymentMethod": "card",
  "reference": "order_1001"
}
```

## Example success response
```json
{
  "paymentId": "pay_12345",
  "status": "AUTHORIZED",
  "amount": 2500,
  "currency": "USD",
  "createdAt": "2026-04-23T10:00:00.000Z"
}
```

## Example error response
```json
{
  "error": "Invalid payment request",
  "code": "VALIDATION_ERROR"
}
```