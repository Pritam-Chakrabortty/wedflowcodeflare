// Test script: sends a real OTP email through the same code path as /api/auth/send-otp
// Usage: node test-send-otp.js [recipient-email]
require('dotenv').config();
const crypto = require('crypto');

const recipient = process.argv[2] || 'pritam420@gmail.com';

async function main() {
  // Load server.js to reuse its email helpers (this also starts the HTTP listener)
  const { sendOTPEmail } = require('./server');

  const otp = crypto.randomInt(100000, 999999).toString();

  console.log(`Sending OTP to ${recipient} via Brevo REST API...`);
  const result = await sendOTPEmail(recipient, otp);
  console.log('Brevo response:', JSON.stringify(result));
  console.log(`OTP for ${recipient}: ${otp} (valid for verification testing)`);
  process.exit(0);
}

main().catch((error) => {
  console.error('Test failed:', error.message);
  process.exit(1);
});
