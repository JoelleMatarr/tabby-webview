const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// Insert your secret key here
const SECRET_KEY = "sk_sbox_y5cec2mmqkclnwptusvh4wi7eax";

app.post("/create-payment-sessions", async (_req, res) => {
  // Create a PaymentSession
  const request = await fetch(
    "https://api.sandbox.checkout.com/payment-sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "amount": 200000,
        "currency": "AED",
        "reference": "ORD-123A",
        "payment_type": "Regular",
        "locale": "ar-SA",
        "description": "Payment for XX",
        "billing_descriptor": {
          "name": "Jia Tsang",
          "city": "Dubai"
        },
        "customer": {
          "email": "otp.success@tabby.ai",
          "name": "Jia Tsang",
          "phone": {
            "number": "500000001",
            "country_code": "+971"
          }
        },
        "shipping": {
          "address": {
            "address_line1": "123 High St.",
            "address_line2": "Flat 456",
            "city": "Dubai",
            "zip": "SW1A 1AA",
            "country": "AE"
          },
          "phone": {
            "number": "500000001",
            "country_code": "+971"
          }
        },
        // "enabled_payment_methods": ["tabby", "tamara"],
        "billing": {
          "address": {
            "address_line1": "123 High St.",
            "address_line2": "Flat 456",
            "city": "Dubai",
            "zip": "SW1A 1AA",
            "country": "AE"
          },
          "phone": {
            "number": "500000001",
            "country_code": "+971"
          }
        },
        "risk": {
          "enabled": true
        },
        "3ds": {
          "enabled": true
          // "attempt_n3d": true
        },
        // "processing": {
        //   "aft": false
        // },
        // "recipient": {
        //   "first_name": "John",
        //   "last_name": "Smith",
        //   "account_number": "5555554444",
        //   "address": {
        //     "country": "SA"
        //   }
        // },
        // "sender": {
        //   "type": "individual",
        //   // "reference": "87654321",
        //   //  "dob": "1990-01-01",
        //   "first_name": "John",
        //   "last_name": "Smith",
        //   "address": {
        //     "address_line1": "123 High Street",
        //     "city": "London",
        //     "country": "SA"
            
        //   }
        // },
        "success_url": "https://google.com/#/checkout_success",
        "failure_url": "https://google.com/#/checkout_error",
        "metadata": {
          "redeemType": "cashback",
          "sd": "2025-05-30T00:00:00"
        },
        "items": [
          {
            "reference": "133",
            "name": "Guitar",
            "quantity": 1,
            "unit_price": 100000
          },
          {
            "reference": "133",
            "name": "Amp",
            "quantity": 1,
            "unit_price": 100000
          }
        ],
        "payment_method_configuration": {
        "card": {
            "store_payment_details": "enabled"
        }},
        //     "processing": {
        //   "shipping_amount": 300
        // },
        //     "enabled_payment_methods": [
        //         "paypal"
        // ],
        "processing_channel_id": "pc_ticd6t2rrmnujacakafvukhbwu"
      })
    }
  );

  const parsedPayload = await request.json();

  res.status(request.status).send(parsedPayload);
});



app.post("/update-payment-sessions", async (_req, res) => {
  // Create a PaymentSession
  console.log("requessst", _req.body)
  const request = await fetch(
    `https://api.sandbox.checkout.com/payment-sessions/${_req.body.ps_id}/submit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_req.body.updatedData),
    }
  );

  const parsedPayload = await request.json();

  res.status(request.status).send(parsedPayload);
});

app.listen(422, () =>
  console.log("Node server listening on port 3001: http://localhost:3001/")
);
