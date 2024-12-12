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

    const { orderId } = result;
    if (!orderId) {
      console.error('orderId not found in the response');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'orderId not found in the response' }),
      };
    }

    // Step 2: Fetch order status using orderId
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

    const { status, output } = statusResult.body;
    if (status === 'active' && output) {
      return {
        statusCode: 200,
        body: JSON.stringify({ output }),
      };
    } else {
      console.error(`Order status is not active. Current status: ${status}`);
      return {
        statusCode: 202, // Accepted but not completed
        body: JSON.stringify({ message: `Order status is ${status}. Please try again later.` }),
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
