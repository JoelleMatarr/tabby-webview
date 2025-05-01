import { useEffect, useRef } from 'react';

const CheckoutIframe = () => {
	const checkout = useRef(null);
	const flowComponentRef = useRef(null);

	const getPaymentSession = async () => {
		const paymentSession = {
			"id": "ps_2vaDhY1qF02L0SXjgtQ03gucNPq",
			"payment_session_secret": "pss_9ca4c89e-4c19-47ef-ad9f-f2c9ca48c185",
			"payment_session_token": "YmFzZTY0:eyJpZCI6InBzXzJ2YURoWTFxRjAyTDBTWGpndFEwM2d1Y05QcSIsImVudGl0eV9pZCI6ImVudF9uaHh2Y2phajc1NXJ3eno2emlkYXl5d29icSIsImV4cGVyaW1lbnRzIjp7fSwicHJvY2Vzc2luZ19jaGFubmVsX2lkIjoicGNfdGljZDZ0MnJybW51amFjYWthZnZ1a2hid3UiLCJhbW91bnQiOjEwMCwibG9jYWxlIjoiZW4tR0IiLCJjdXJyZW5jeSI6IlNBUiIsInBheW1lbnRfbWV0aG9kcyI6W3sidHlwZSI6ImNhcmQiLCJjYXJkX3NjaGVtZXMiOlsiVmlzYSIsIk1hc3RlcmNhcmQiXSwic2NoZW1lX2Nob2ljZV9lbmFibGVkIjpmYWxzZSwic3RvcmVfcGF5bWVudF9kZXRhaWxzIjoiZW5hYmxlZCJ9LHsidHlwZSI6ImFwcGxlcGF5IiwiZGlzcGxheV9uYW1lIjoidGVzdCIsImNvdW50cnlfY29kZSI6IlNBIiwiY3VycmVuY3lfY29kZSI6IlNBUiIsIm1lcmNoYW50X2NhcGFiaWxpdGllcyI6WyJzdXBwb3J0czNEUyJdLCJzdXBwb3J0ZWRfbmV0d29ya3MiOlsidmlzYSIsIm1hc3RlckNhcmQiXSwidG90YWwiOnsibGFiZWwiOiJ0ZXN0IiwidHlwZSI6ImZpbmFsIiwiYW1vdW50IjoiMSJ9fSx7InR5cGUiOiJnb29nbGVwYXkiLCJtZXJjaGFudCI6eyJpZCI6IjA4MTEzMDg5Mzg2MjY4ODQ5OTgyIiwibmFtZSI6InRlc3QiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDEifSwidHJhbnNhY3Rpb25faW5mbyI6eyJ0b3RhbF9wcmljZV9zdGF0dXMiOiJGSU5BTCIsInRvdGFsX3ByaWNlIjoiMSIsImNvdW50cnlfY29kZSI6IlNBIiwiY3VycmVuY3lfY29kZSI6IlNBUiJ9LCJjYXJkX3BhcmFtZXRlcnMiOnsiYWxsb3dlZF9hdXRoX21ldGhvZHMiOlsiUEFOX09OTFkiLCJDUllQVE9HUkFNXzNEUyJdLCJhbGxvd2VkX2NhcmRfbmV0d29ya3MiOlsiVklTQSIsIk1BU1RFUkNBUkQiXX19XSwiZmVhdHVyZV9mbGFncyI6WyJhbmFseXRpY3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwiY2FyZF9maWVsZHNfZW5hYmxlZCIsImdldF93aXRoX3B1YmxpY19rZXlfZW5hYmxlZCIsImxvZ3Nfb2JzZXJ2YWJpbGl0eV9lbmFibGVkIiwicmlza19qc19lbmFibGVkIiwidXNlX25vbl9iaWNfaWRlYWxfaW50ZWdyYXRpb24iXSwicmlzayI6eyJlbmFibGVkIjpmYWxzZX0sIm1lcmNoYW50X25hbWUiOiJ0ZXN0IiwicGF5bWVudF9zZXNzaW9uX3NlY3JldCI6InBzc185Y2E0Yzg5ZS00YzE5LTQ3ZWYtYWQ5Zi1mMmM5Y2E0OGMxODUiLCJwYXltZW50X3R5cGUiOiJSZWd1bGFyIiwiaW50ZWdyYXRpb25fZG9tYWluIjoiYXBpLnNhbmRib3guY2hlY2tvdXQuY29tIn0=",
			"_links": {
				"self": {
					"href": "https://api.sandbox.checkout.com/payment-sessions/ps_2vaDhY1qF02L0SXjgtQ03gucNPq"
				}
			}
		}
		return JSON.stringify(paymentSession);
	};

	const createSession = async () => {
		try {
			const paymentSessionData = await getPaymentSession();

			const checkoutFlow = await window.CheckoutWebComponents({
				paymentSession: JSON.parse(paymentSessionData),
				publicKey: 'pk_sbox_vg6wboahmt4ir6fig3e2cmwcxmi',
				// onPaymentCompleted: async (_self, paymentResponse) => {
				// 	// Handle synchronous payments
				// 	await chargeCODWallet?.();
				// 	console.log('paymentResponse', paymentResponse);
				// },
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
				showPayButton: false,
				onReady: (_self) => {
					// Hide loading overlay
					// hideLoadingOverlay();
					console.log('ready');
				},
				onChange: (_self) => {
					// Enable/disable custom pay button based on input validity
					console.log('onchange', _self);
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
			checkout.current = checkoutFlow;
			const flowComponent = checkoutFlow.create('flow');
			flowComponentRef.current = flowComponent;
			flowComponent.mount('#flow-container');
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		createSession();
	}, []);

	const test = () => {
		flowComponentRef.current.submit();
	};

	return (
		<>
			<button onClick={test}>Test</button>
			<div id="flow-container"></div>
		</>
	);
};

export default CheckoutIframe;
