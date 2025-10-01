# Razorpay Integration Guide

This document explains how to set up and use Razorpay payment integration in the Aoin Store e-commerce application.

## Frontend Setup

### 1. Environment Variables
Add the following environment variables to your `.env` file:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
```

### 2. Razorpay Script
The Razorpay checkout script is already included in `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### 3. Configuration
Razorpay configuration is set in `src/config.ts`:
```typescript
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag';
export const RAZORPAY_CURRENCY = 'INR';
```

## Backend Setup

### 1. Install Dependencies
Install the Razorpay Python SDK:
```bash
pip install razorpay
```

### 2. Environment Variables
Add the following environment variables to your backend `.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

### 3. Configuration
Razorpay configuration is set in `config.py`:
```python
RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID', 'rzp_test_1DP5mmOlF5G5ag')
RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET', 'your_secret_key')
```

## API Endpoints

### 1. Create Razorpay Order
- **Endpoint**: `POST /api/razorpay/create-order`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "amount": 50000,
    "currency": "INR"
  }
  ```

### 2. Verify Payment
- **Endpoint**: `POST /api/razorpay/verify-payment`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "razorpay_payment_id": "pay_xxx",
    "razorpay_order_id": "order_xxx",
    "razorpay_signature": "signature_xxx"
  }
  ```

### 3. Get Payment Details
- **Endpoint**: `GET /api/razorpay/payment-details/<payment_id>`
- **Headers**: `Authorization: Bearer <token>`

### 4. Create Refund
- **Endpoint**: `POST /api/razorpay/refund`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "payment_id": "pay_xxx",
    "amount": 50000,
    "notes": {
      "reason": "Customer request"
    }
  }
  ```

## Usage in Frontend

### 1. Payment Method Selection
Users can select "Razorpay (UPI/Cards/Net Banking)" as a payment method on the payment page.

### 2. Payment Flow
1. User selects Razorpay payment method
2. Frontend creates a Razorpay order via API
3. Razorpay payment modal opens
4. User completes payment
5. Payment is verified on the backend
6. Order is created and processed

### 3. RazorpayPayment Component
The `RazorpayPayment` component handles the payment modal:
```tsx
<RazorpayPayment
  amount={finalTotal}
  orderId={razorpayOrderId}
  customerName={user?.name || formData.contact_name}
  customerEmail={user?.email}
  customerPhone={formData.contact_phone}
  onSuccess={handleRazorpaySuccess}
  onError={handleRazorpayError}
  onClose={handleRazorpayClose}
  description="Aoin Store Purchase"
  businessName="Aoin Store"
  businessLogo="https://aoinstore.com/logo.png"
/>
```

## Test Mode

The integration is currently set up for Razorpay test mode. To use in production:

1. Replace test keys with live keys
2. Update the Razorpay script URL if needed
3. Test thoroughly before going live

## Security Notes

1. Never expose Razorpay secret key in frontend code
2. Always verify payment signatures on the backend
3. Use HTTPS in production
4. Implement proper error handling and logging

## Testing

Use Razorpay test cards for testing:
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date
- **Name**: Any name

## Support

For Razorpay-specific issues, refer to the [Razorpay Documentation](https://razorpay.com/docs/).
