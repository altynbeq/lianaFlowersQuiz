// netlify/functions/sendPhotos.js

exports.handler = async (event, context) => {
  console.log('Received event:', event);

  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Parsing request body...');
    const { imageUrl, styleImageUrl, textPrompt } = JSON.parse(event.body);
    console.log('Parsed body:', { imageUrl, styleImageUrl, textPrompt });

    // Validate required fields
    if (!imageUrl || !styleImageUrl || !textPrompt) {
      console.error('Missing required fields:', { imageUrl, styleImageUrl, textPrompt });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: imageUrl, styleImageUrl, textPrompt' }),
      };
    }

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      console.error('LIGHTX_API_KEY is not defined');
      throw new Error('LIGHTX_API_KEY is not defined');
    }
    console.log('API_Key:', '***'); // Mask API key for security

    const apiUrl = 'https://api.lightxeditor.com/external/api/v1/avatar';
    console.log('External API URL:', apiUrl);

    const data = {
      imageUrl,
      styleImageUrl,
      textPrompt,
    };
    console.log('Data to send to external API:', data);

    console.log('Sending request to external API...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });
    console.log('Received response from external API with status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API Error Response:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const result = await response.json();
    console.log('External API Response:', result);

    // Adjust this based on the actual structure of the first API's response
    // Assuming orderId is directly under result
    const { orderId } = result.body;
    if (!orderId) {
      console.error('orderId not found in the response');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'orderId not found in the response' }),
      };
    }

    // Polling parameters
    const maxRetries = 5;
    const interval = 3000; // 3 seconds

    // Helper function to pause execution for a given duration
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Polling loop
    let retries = 0;
    let status = '';
    let output = '';

    while (retries < maxRetries) {
      console.log(`Attempt ${retries + 1} to fetch order status...`);

      const secondApi = 'https://api.lightxeditor.com/external/api/v1/order-status';
      console.log('Sending request to order-status API with orderId:', orderId);

      const statusResponse = await fetch(secondApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ orderId }), // Send as an object
      });

      console.log('Received response from order-status API with status:', statusResponse.status);

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        console.error('Order Status API Error Response:', errorText);
        return {
          statusCode: statusResponse.status,
          body: JSON.stringify({ error: errorText }),
        };
      }

      const statusResult = await statusResponse.json();
      console.log('Order Status API Response:', statusResult);

      // Adjust based on the actual structure of the order-status API's response
      const { status: currentStatus, output: currentOutput } = statusResult.body;

      if (currentStatus === 'active' && currentOutput) {
        console.log('Order is active. Output URL:', currentOutput);
        output = currentOutput;
        break; // Exit the loop as we have the desired status
      } else {
        console.log(`Order status is "${currentStatus}". Retrying in ${interval / 1000} seconds...`);
        await sleep(interval); // Wait for the specified interval before retrying
        retries += 1;
      }
    }

    if (output) {
      // If output is obtained, return it
      return {
        statusCode: 200,
        body: JSON.stringify({ output }),
      };
    } else {
      // If max retries reached and status is not active
      return {
        statusCode: 202, // Accepted but not completed
        body: JSON.stringify({ message: 'Order is still processing. Please try again later.' }),
      };
    }

  } catch (error) {
    console.error('Error in sendPhotos function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};
