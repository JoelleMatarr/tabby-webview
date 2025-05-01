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
        "amount": 20000,
        "currency": "AED",
        "reference": "ORD-12",
        "description": "Payment for flow",
        "payment_type": "Regular",
        "billing_descriptor": {
            "name": "XYZ",
            "city": "Riyadh"
        },
        "customer": {
            "email": "otp.success@tabby.ai",
            "name": "Jia Tsang",
            "phone": {
                "number": "500000001",
                "country_code": "+971"
            }
        },
        // "risk": {
        //   "device_session_id": _req.body.deviceSessionId
        // },
        "shipping": {
            "address": {
                "address_line1": "Dubai",
                "address_line2": "Flat 456",
                "city": "Dubai",
                "zip": "00000",
                "country": "AE"
            },
            "phone": {
                "number": "500000001",
                "country_code": "+971"
            }
        },
        "billing": {
            "address": {
                "address_line1": "Dubai",
                "address_line2": "Flat 456",
                "city": "Dubai",
                "zip": "00000",
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
        },
        "success_url": "http://localhost:3001?status=success",
        "failure_url": "http://localhost:3001?status=failure",
        "metadata": {
            "account_category": "international_cards_allowed",
            "client_iden": "client10",
            "type": "retail"
        },
        // "capture": false,
        "payment_method_configuration": {
            "card": {
                "store_payment_details": "enabled"
            }
            //   "applepay": {
            //     "store_payment_details": "disabled"
            //   }
        },
        // "disabled_payment_methods": ["card"],
        "enabled_payment_methods": [
            //     // "tamara",
            // "card"
                "tabby"
            // "googlepay"
        ],
        "items": [
            {
                "name": "Guitar",
                "quantity": 1,
                "unit_price": 10000
            },
            {
                "name": "Amp",
                "quantity": 1,
                "unit_price": 10000
            }
        ],
        "processing_channel_id": "pc_ticd6t2rrmnujacakafvukhbwu"
    }),
    }
  );

  const parsedPayload = await request.json();

  res.status(request.status).send(parsedPayload);
});

app.listen(3001, () =>
  console.log("Node server listening on port 3001: http://localhost:3001/")
);
