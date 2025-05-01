/* global CheckoutWebComponents */
(async () => {
  // Insert your public key here
  const PUBLIC_KEY = "pk_sbox_cwlkrqiyfrfceqz2ggxodhda2yh";

  const response = await fetch("/create-payment-sessions", { method: "POST" }); // Order

  const paymentSession = await response.json();
  
//   const paymentSession ={
//     "id": "ps_2wV7oLBsciq1Xw2NpagwmChuzOC",
//     "payment_session_secret": "pss_009d4916-1a66-48e7-9f36-a4c0a0583e81",
//     "payment_session_token": "YmFzZTY0:eyJpZCI6InBzXzJ3VjdvTEJzY2lxMVh3Mk5wYWd3bUNodXpPQyIsImVudGl0eV9pZCI6ImVudF9uaHh2Y2phajc1NXJ3eno2emlkYXl5d29icSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfdGljZDZ0MnJybW51amFjYWthZnZ1a2hid3UiLCJhbW91bnQiOjIwMDAwLCJsb2NhbGUiOiJlbi1HQiIsImN1cnJlbmN5IjoiQUVEIiwicGF5bWVudF9tZXRob2RzIjpbeyJ0eXBlIjoidGFiYnkiLCJjb3VudHJ5X2NhbGxpbmdfY29kZXMiOlsiOTcxIl19XSwiZmVhdHVyZV9mbGFncyI6WyJhbmFseXRpY3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwiY2FyZF9maWVsZHNfZW5hYmxlZCIsImdldF93aXRoX3B1YmxpY19rZXlfZW5hYmxlZCIsImxvZ3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwicmlza19qc19lbmFibGVkIiwidXNlX25vbl9iaWNfaWRlYWxfaW50ZWdyYXRpb24iXSwicmlzayI6eyJlbmFibGVkIjpmYWxzZX0sIm1lcmNoYW50X25hbWUiOiJKb2VsbGVNVGVzdCIsInBheW1lbnRfc2Vzc2lvbl9zZWNyZXQiOiJwc3NfMDA5ZDQ5MTYtMWE2Ni00OGU3LTlmMzYtYTRjMGEwNTgzZTgxIiwicGF5bWVudF90eXBlIjoiUmVndWxhciIsImludGVncmF0aW9uX2RvbWFpbiI6ImFwaS5zYW5kYm94LmNoZWNrb3V0LmNvbSJ9",
//     "_links": {
//         "self": {
//             "href": "https://api.sandbox.checkout.com/payment-sessions/ps_2wV7oLBsciq1Xw2NpagwmChuzOC"
//         }
//     }
// }
  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  var flowComponent;

  var acceptedTermsAndConditions = true
  const handleClick = (_self) => {
    const googlePayContainer = document.getElementById("googlepayAccordionContainer");

    if (googlePayContainer) {
      googlePayContainer.addEventListener("click", () => {
        console.log("Google Pay accordion clicked");
      });
    } else {
      console.log("googlepayAccordionContainer not found");
    }
  

    if (acceptedTermsAndConditions) {
      console.log("hello", _self?.type)

      if(_self.type == "googlepay") {
      console.log("unmount", _self?.type)

        // flowComponent.unmount('#card-container');
      }
      else {
      console.log("aade", _self?.type)

      }
      return {
        continue: true,
      }
    }
    
    return {
      continue: false
    }
  }


  const checkout = await CheckoutWebComponents({
    paymentSession,
    publicKey: 'pk_sbox_cwlkrqiyfrfceqz2ggxodhda2yh',
    // onPaymentCompleted: async (_self, paymentResponse) => {
    // 	// Handle synchronous payments
    // 	await chargeCODWallet?.();
    // 	console.log('paymentResponse', paymentResponse);
    // },
    handleClick,
    environment: 'sandbox',
    componentOptions: {
      // flow: {
      // 	expandFirstPaymentMethod: false
      // },
      card: {
        data: {
          cardholderName: 'Test OTO'
        },
        displayCardholderName: 'top'
      }
    },
    // onCardBinChanged: (_self, card_metadata) => {
    //   console.log("card metata",card_metadata )
    //   if (card_metadata.card_type === 'credit') {
    //     console.log("card metata",card_metadata )
    //     return {
    //       continue: false,
    //       errorMessage: 'Credit cards are not accepted.',
    //     };
    //   }
    //   return { continue: true };
    // },
    // showPayButton: false,
    onReady: (_self) => {
      // Hide loading overlay
      // hideLoadingOverlay();
      console.log('ready');
    },
    onChange: (_self) => {
      // Enable/disable custom pay button based on input validity
      console.log('onchange', _self);

      if (_self.isValid()) {
      console.log('onchange valid', _self);

        // submitButton.removeAttribute('disabled');
      } else {
      console.log('onchange not valid', _self);

        // submitButton.setAttribute('disabled', true);
      }
    },
    onSubmit: (_self) => {
      console.log('onSubmit', _self);

      // Show loading overlay to prevent further user interaction
      // showLoadingOverlay();
    },
    
    onPaymentCompleted: (_self, paymentResponse) => {
      // Handle synchronous payments
      console.log('paymentResponse', paymentResponse);
    }
  });
  // checkout.current = checkoutFlow;
  // const flowComponent = checkout.create('flow');
  // // flowComponentRef.current = flowComponent;
  // flowComponent.mount('#flow-container');

   flowComponent = checkout.create('flow');
  //  ApplePayComponent = checkout.create('applepay');
  flowComponent.mount('#card-container');
  //  ApplePayComponent.mount('#applepay-container');

 

  //  if (await flowComponent.isAvailable()) {
  //   flowComponent.mount(document.getElementById("card-container"));
  // }


  // const gpayComponent = checkout.create('googlepay');
  // // gpayComponent.mount('#gpay-container');

  // if (await gpayComponent.isAvailable()) {
  //   gpayComponent.mount(document.getElementById("gpay-container"));
  // }

  document.getElementById("demo").addEventListener("click", myFunction);

  function myFunction() {
    flowComponent.submit()
  }

  // if (await flowComponent.isAvailable()) {
  //   flowComponent.mount(document.getElementById("flow-container"));
  // }


})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

if (paymentStatus === "succeeded") {
  triggerToast("successToast");
}

if (paymentStatus === "failed") {
  triggerToast("failedToast");
}

if (paymentId) {
  console.log("Create Payment with PaymentId: ", paymentId);
}




// //check if URL changed

// const observer = new MutationObserver(() => {
//   const url = window.location.href;

//   const urlParams = new URLSearchParams(window.location.search);
//   const paymentId = urlParams.get("payment_id");

//   // If Tabby redirected to this URL with payment ID
//   if (paymentId) {
//     // ✅ Redirect to your app with status (optional query param)
//     window.location.href = `tabbyapp://close`;
//   }
// });

// // Start observing changes to the document (can catch SPA changes)
// observer.observe(document, { subtree: true, childList: true });

// // Fallback: Also check on load in case it's already present
// window.addEventListener("load", () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const paymentId = urlParams.get("payment_id");

//   if (paymentId) {
//     window.location.href = `tabbyapp://close`;
//   }
// });