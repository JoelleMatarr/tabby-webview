const crypto = require('crypto');

/**
 * Deterministically stringify a JS object (sorted keys) and hash it using HMAC-SHA256.
 * @param {object} data - The object to hash.
 * @param {string} secretKey - Your HMAC key.
 * @returns {string} - The HMAC-SHA256 hash in hex.
 */

function generateHmacSha256(jsonObj, secretKey) {
  const jsonString = JSON.stringify(jsonObj); // this line fixes the error
  return crypto
    .createHmac('sha256', secretKey)
    .update(jsonString, 'utf8')
    .digest('hex');
}

// Example usage
const yourSecretKey = "624092d2-32b4-4f96-aa6c-51aaa11fdb33";
const objectToHash = {
  "id": "evt_covaur7ej3se3dfwlisbu2v2ua",
  "type": "payment_captured",
  "version": "1.0.47",
  "created_on": "2025-06-09T07:18:20.523Z",
  "data": {
    "id": "pay_nhc2w3ya44gexnyekrlyabn6ba",
    "action_id": "act_rewa724jud3u3gpephvyfhltae",
    "reference": "ORD-123A",
    "amount": 200000,
    "processed_on": "2025-06-09T07:18:20.5118165Z",
    "response_code": "10000",
    "response_summary": "Approved",
    "balances": {
      "total_authorized": 200000,
      "total_voided": 0,
      "available_to_void": 0,
      "total_captured": 200000,
      "available_to_capture": 0,
      "total_refunded": 0,
      "available_to_refund": 200000
    },
    "metadata": {
      "sd": "2025-05-30T00:00:00",
      "redeemType": "cashback",
      "cko_payment_session_id": "ps_2yGGQgIMwmZyBPYC0Zr9htbxC0M"
    },
    "currency": "AED",
    "processing": {
      "acquirer_transaction_id": "335351250385935641903",
      "acquirer_reference_number": "64134842713367589299047"
    },
    "event_links": {
      "payment": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba",
      "payment_actions": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba/actions",
      "refund": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba/refunds"
    }
  },
  "_links": {
    "self": {
      "href": "https://api.sandbox.checkout.com/workflows/events/evt_covaur7ej3se3dfwlisbu2v2ua"
    },
    "subject": {
      "href": "https://api.sandbox.checkout.com/workflows/events/subject/pay_nhc2w3ya44gexnyekrlyabn6ba"
    },
    "payment": {
      "href": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba"
    },
    "payment_actions": {
      "href": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba/actions"
    },
    "refund": {
      "href": "https://api.sandbox.checkout.com/payments/pay_nhc2w3ya44gexnyekrlyabn6ba/refunds"
    }
  }
};

const hash = generateHmacSha256(objectToHash, yourSecretKey);
console.log("Hashed Object:", hash);
